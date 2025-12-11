package com.sellphones.service.product.admin;

import com.sellphones.constant.AppConstants;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.ProductResponse;
import com.sellphones.dto.product.admin.*;
import com.sellphones.dto.product.ProductVariantResponse;
import com.sellphones.entity.product.*;
import com.sellphones.entity.promotion.GiftProduct;
import com.sellphones.entity.promotion.ProductPromotion;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.ProductMapper;
import com.sellphones.repository.product.*;
import com.sellphones.repository.promotion.GiftProductRepository;
import com.sellphones.repository.promotion.ProductPromotionRepository;
import com.sellphones.service.file.FileStorageService;
import com.sellphones.specification.admin.AdminProductSpecificationBuilder;
import com.sellphones.specification.admin.AdminProductVariantSpecificationBuilder;
import com.sellphones.utils.ImageNameToImageUrlConverter;
import com.sellphones.utils.JsonParser;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminProductServiceImpl implements AdminProductService{

    private final ProductRepository productRepository;

    private final ProductVariantRepository productVariantRepository;

    private final CategoryRepository categoryRepository;

    private final BrandRepository brandRepository;

    private final AttributeValueRepository attributeValueRepository;

    private final ProductPromotionRepository productPromotionRepository;

    private final GiftProductRepository giftProductRepository;

    private final WarrantyRepository warrantyRepository;

    private final FileStorageService fileStorageService;

    private final ProductMapper productMapper;

    private final ModelMapper modelMapper;

    private final JsonParser jsonParser;

    @Override
    @PreAuthorize("""
        hasAnyAuthority(
            'SALES.ORDERS',
            'CATALOG.PRODUCTS',
            'INVENTORY.WAREHOUSES'
        )
    """)
    public PageResponse<ProductResponse> getProducts(AdminProduct_FilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.ASC);
        Sort sort = Sort.by(direction, "id");

        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Product> spec = AdminProductSpecificationBuilder.build(request);

        Page<Product> productPage = productRepository.findAll(spec, pageable);

        List<Product> products = productPage.getContent();

        List<ProductResponse> response = products.stream()
                .map(p -> {
                    ProductResponse resp = modelMapper.map(p, ProductResponse.class);
                    resp.setThumbnail(ImageNameToImageUrlConverter.convert(p.getThumbnail(), AppConstants.PRODUCT_THUMBNAIL_FOLDER));
                    return resp;
                })
                .toList();

        return PageResponse.<ProductResponse>builder()
                .result(response)
                .total(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS')")
    public AdminProductDetailsResponse getProductById(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        product.setThumbnail(ImageNameToImageUrlConverter.convert(product.getThumbnail(), AppConstants.PRODUCT_THUMBNAIL_FOLDER));
        product.setImages(
                product.getImages()
                        .stream()
                        .map(i -> ImageNameToImageUrlConverter.convert(i, AppConstants.PRODUCT_IMAGE_FOLDER))
                        .toList()
        );
        ProductVariant thumbnailProduct = product.getThumbnailProduct();
        if(thumbnailProduct != null){
            thumbnailProduct.setVariantImage(ImageNameToImageUrlConverter.convert(
                    thumbnailProduct.getVariantImage(), AppConstants.PRODUCT_VARIANT_IMAGE_FOLDER
            ));
        }
        return modelMapper.map(product, AdminProductDetailsResponse.class);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS')")
    public void createProduct(String productJson, MultipartFile[] imageFiles, MultipartFile thumbnailFile) {
        AdminProductRequest request = jsonParser.parseRequest(productJson, AdminProductRequest.class);

        List<String> imageNames = new ArrayList<>();

        String thumbnailName = "";
        if (thumbnailFile != null) {
            try {
                thumbnailName = fileStorageService.store(thumbnailFile, AppConstants.PRODUCT_THUMBNAIL_FOLDER);
            } catch (Exception e) {
                log.error("Failed to upload thumbnail file {}", thumbnailFile.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        if(imageFiles != null){
            Arrays.asList(imageFiles).forEach(f -> {
                String fileName = fileStorageService.store(f, AppConstants.PRODUCT_IMAGE_FOLDER);
                imageNames.add(fileName);
            });
        }

        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        Brand brand = brandRepository.findById(request.getBrandId()).orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));
        Product product = productMapper.mapToCreatedProductEntity(request, brand, category, thumbnailName, imageNames);
        product.setStatus(ProductStatus.INACTIVE);
        productRepository.save(product);

        String finalThumbnailName = thumbnailName;
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCompletion(int status) {
                if(status == STATUS_ROLLED_BACK){
                    if (StringUtils.hasText(finalThumbnailName)) {
                        fileStorageService.delete(finalThumbnailName, AppConstants.PRODUCT_THUMBNAIL_FOLDER);
                    }
                    imageNames.forEach(fileName -> {
                        try {
                            fileStorageService.delete(fileName, AppConstants.PRODUCT_IMAGE_FOLDER);
                        } catch (Exception ex) {
                            log.error("Failed to cleanup file {} after rollback", fileName, ex);
                        }
                    });                }
            }
        });
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS')")
    public void updateProduct(String productJson, MultipartFile[] imageFiles, MultipartFile thumbnailFile, Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        AdminUpdateProductRequest request = jsonParser.parseRequest(productJson, AdminUpdateProductRequest.class);

        List<String> imageNames = new ArrayList<>();

        String thumbnailName = product.getThumbnail();
        if (thumbnailFile != null) {
            try {
                if (thumbnailName != null && !thumbnailName.isEmpty()) {
                    fileStorageService.store(thumbnailFile, thumbnailName, AppConstants.PRODUCT_THUMBNAIL_FOLDER);
                } else {
                    thumbnailName = fileStorageService.store(thumbnailFile, AppConstants.PRODUCT_THUMBNAIL_FOLDER);
                }
            } catch (Exception e) {
                log.error("Failed to upload icon file {}", thumbnailFile.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }else{
            fileStorageService.delete(thumbnailName, AppConstants.PRODUCT_THUMBNAIL_FOLDER);
            thumbnailName = "";
        }

        if(imageFiles != null){
            for(MultipartFile f : imageFiles) {
                String fileName = fileStorageService.store(f, AppConstants.PRODUCT_IMAGE_FOLDER);
//                System.out.println("file name " + fileName);
                imageNames.add(fileName);
            }
        }
        product.getImages().forEach(i -> fileStorageService.delete(i, AppConstants.PRODUCT_IMAGE_FOLDER));

        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        Brand brand = brandRepository.findById(request.getBrandId()).orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));
        Product editedProduct = productMapper.mapToEditedProductEntity(
            product, request, brand, category, thumbnailName, imageNames
        );

//        System.out.println(editedProduct.getImages());
        productRepository.save(editedProduct);

    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS')")
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        List<ProductVariant> variants = product.getProductVariants();
        List<String> variantImages = variants.stream()
                .map(ProductVariant::getVariantImage)
                .toList();

        String thumbnailName = product.getThumbnail();
        List<String> images = product.getImages();

        productRepository.delete(product);

        if(thumbnailName != null && !thumbnailName.isBlank()){
            fileStorageService.delete(thumbnailName, AppConstants.PRODUCT_THUMBNAIL_FOLDER);
        }

        for (String image : images) {
            if (image != null && !image.isBlank()) {
                fileStorageService.delete(image, AppConstants.PRODUCT_IMAGE_FOLDER);
            }
        }

        for(String image : variantImages){
            if(image != null && !image.isBlank()){
                fileStorageService.delete(image, AppConstants.PRODUCT_VARIANT_IMAGE_FOLDER);
            }
        }
    }


    @Override
    @PreAuthorize("""
        hasAnyAuthority(
            'SALES.ORDERS',
            'CATALOG.PRODUCTS',
            'INVENTORY.WAREHOUSES'
        )
    """)
    public PageResponse<AdminProductVariantResponse> getProductVariants(AdminProductVariant_FilterRequest request, Long productId) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "id");

        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<ProductVariant> spec = AdminProductVariantSpecificationBuilder.build(request, productId);

        Page<ProductVariant> productVariantPage = productVariantRepository.findAll(spec, pageable);

        List<ProductVariant> variants = productVariantPage.getContent();

        List<AdminProductVariantResponse> response = variants.stream()
                .map(v -> {
                    AdminProductVariantResponse resp = modelMapper.map(v, AdminProductVariantResponse.class);
                    resp.setVariantImage(ImageNameToImageUrlConverter.convert(v.getVariantImage(), AppConstants.PRODUCT_VARIANT_IMAGE_FOLDER));
                    return resp;
                })
                .toList();

        return PageResponse.<AdminProductVariantResponse>builder()
                .result(response)
                .total(productVariantPage.getTotalElements())
                .totalPages(productVariantPage.getTotalPages())
                .build();

    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS')")
    public void setThumbnail(Long productId, Long id) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        ProductVariant variant = productVariantRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));

        product.setThumbnailProduct(variant);
        productRepository.save(product);
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS')")
    public ProductVariantResponse getVariantById(Long id) {
        ProductVariant productVariant = productVariantRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));
        productVariant.setVariantImage(ImageNameToImageUrlConverter.convert(productVariant.getVariantImage(), AppConstants.PRODUCT_VARIANT_IMAGE_FOLDER));
        return modelMapper.map(productVariant, ProductVariantResponse.class);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS')")
    public void createVariant(String productVariantJson, MultipartFile imageFile, Long productId) {
        AdminProductVariantRequest request = jsonParser.parseRequest(productVariantJson, AdminProductVariantRequest.class);
        String variantImage = "";
        if (imageFile != null) {
            try {
                variantImage = fileStorageService.store(imageFile, AppConstants.PRODUCT_VARIANT_IMAGE_FOLDER);
            } catch (Exception e) {
                log.error("Failed to upload thumbnail file {}", imageFile.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        ProductVariant productVariant = productMapper.mapToCreatedVariantEntity(
                request,
                variantImage,
                product
        );

        productVariantRepository.save(productVariant);

        String finalVariantImage = variantImage;
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCompletion(int status) {
                if(status == STATUS_ROLLED_BACK){
                    if (StringUtils.hasText(finalVariantImage)) {
                        fileStorageService.delete(finalVariantImage, AppConstants.PRODUCT_VARIANT_IMAGE_FOLDER);
                    }
                }
            }
        });
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS')")
    public void updateVariant(String productVariantJson, MultipartFile imageFile, Long productVariantId) {
        ProductVariant productVariant = productVariantRepository.findById(productVariantId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));
        AdminUpdateProductVariantRequest request = jsonParser
                .parseRequest(productVariantJson, AdminUpdateProductVariantRequest.class);

        String variantImage = productVariant.getVariantImage();
        if (imageFile != null) {
            try {
                if (variantImage != null && !variantImage.isEmpty()) {
                    fileStorageService.store(imageFile, variantImage, AppConstants.PRODUCT_VARIANT_IMAGE_FOLDER);
                } else {
                    variantImage = fileStorageService.store(imageFile, AppConstants.PRODUCT_VARIANT_IMAGE_FOLDER);
                }
            } catch (Exception e) {
                log.error("Failed to upload icon file {}", imageFile.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        List<ProductPromotion> promotions = request.getPromotionIds() != null
                ? productPromotionRepository.findByIdIn(request.getPromotionIds())
                : new ArrayList<>();
        System.out.println("editProductVariant " + promotions.size());

        List<GiftProduct> giftProducts = request.getGiftProductIds() != null
                ? giftProductRepository.findByIdIn(request.getGiftProductIds())
                : new ArrayList<>();

        List<AttributeValue> attributeValues = request.getAttributeValueIds() != null
                ? attributeValueRepository.findByIdIn(request.getAttributeValueIds())
                : new ArrayList<>();

        List<Warranty> warranties = request.getWarrantyIds() != null
                ? warrantyRepository.findByIdIn(request.getWarrantyIds())
                : new ArrayList<>();

        ProductVariant editedProductVariant = productMapper.mapToEditedProductVariantEntity(
                productVariant,
                request,
                variantImage,
                promotions,
                giftProducts,
                attributeValues,
                warranties
        );

        productVariantRepository.save(editedProductVariant);

    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS')")
    public void deleteVariant(Long productVariantId) {
        ProductVariant productVariant = productVariantRepository.findById(productVariantId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));
        String imageName = productVariant.getVariantImage();

        productVariantRepository.delete(productVariant);

        if(imageName != null && !imageName.isEmpty()){
            fileStorageService.delete(imageName, AppConstants.PRODUCT_IMAGE_FOLDER);
        }
    }



}
