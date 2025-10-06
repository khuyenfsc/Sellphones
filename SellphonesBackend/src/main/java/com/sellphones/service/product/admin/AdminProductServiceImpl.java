package com.sellphones.service.product.admin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.dto.product.admin.*;
import com.sellphones.dto.product.response.ProductVariantResponse;
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
import com.sellphones.specification.admin.AdminProductVariantSpecification;
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

    private final String productThumbnailFolder = "product_thumbnails";

    private final String productImageFolder = "product_images";

    private final String productVariantImageFolder = "product_variant_images";

    private final ObjectMapper objectMapper;

    private final ModelMapper modelMapper;

    @Override
    public AdminProductDetailResponse getProductDetails(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        product.setThumbnail(ImageNameToImageUrlConverter.convert(product.getThumbnail(), productThumbnailFolder));
        product.setImages(
                product.getImages()
                        .stream()
                        .map(i -> ImageNameToImageUrlConverter.convert(i, productImageFolder))
                        .toList()
        );
        return modelMapper.map(product, AdminProductDetailResponse.class);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS.CREATE')")
    public void addProduct(String productJson, MultipartFile[] imageFiles, MultipartFile thumbnailFile) {
        AdminProductRequest request = JsonParser.parseRequest(productJson, AdminProductRequest.class, objectMapper);

        List<String> imageNames = new ArrayList<>();

        String thumbnailName = "";
        if (thumbnailFile != null) {
            try {
                thumbnailName = fileStorageService.store(thumbnailFile, productThumbnailFolder);
            } catch (Exception e) {
                log.error("Failed to upload thumbnail file {}", thumbnailFile.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        if(imageFiles != null){
            Arrays.asList(imageFiles).forEach(f -> {
                String fileName = fileStorageService.store(f, productImageFolder);
                imageNames.add(fileName);
            });
        }

        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        Brand brand = brandRepository.findById(request.getBrandId()).orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));
        Product product = productMapper.mapToProductEntity(request, brand, category, thumbnailName, imageNames);
        productRepository.save(product);

        String finalThumbnailName = thumbnailName;
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCompletion(int status) {
                if(status == STATUS_ROLLED_BACK){
                    if (StringUtils.hasText(finalThumbnailName)) {
                        fileStorageService.delete(finalThumbnailName, productThumbnailFolder);
                    }
                    imageNames.forEach(fileName -> {
                        try {
                            fileStorageService.delete(fileName, productImageFolder);
                        } catch (Exception ex) {
                            log.error("Failed to cleanup file {} after rollback", fileName, ex);
                        }
                    });                }
            }
        });
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS.EDIT')")
    public void editProduct(String productJson, MultipartFile[] imageFiles, MultipartFile thumbnailFile, Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        AdminProductRequest request = JsonParser.parseRequest(productJson, AdminProductRequest.class, objectMapper);

        List<String> imageNames = new ArrayList<>();

        String thumbnailName = product.getThumbnail();
        if (thumbnailFile != null) {
            try {
                fileStorageService.store(thumbnailFile, thumbnailName, productThumbnailFolder);
            } catch (Exception e) {
                log.error("Failed to upload thumbnail file {}", thumbnailFile.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        if(imageFiles != null){
            Arrays.asList(imageFiles).forEach(f -> {
                String fileName = fileStorageService.store(f, productImageFolder);
                imageNames.add(fileName);
            });
        }
        product.getImages().forEach(i -> fileStorageService.delete(i, productImageFolder));

        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        Brand brand = brandRepository.findById(request.getBrandId()).orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));
        Product editedProduct = productMapper.mapToProductEntity(request, brand, category, thumbnailName, imageNames);
        editedProduct.setId(productId);
        productRepository.save(editedProduct);

    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS.DELETE')")
    public void deleteProduct(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        fileStorageService.delete(product.getThumbnail(), productThumbnailFolder);
        product.getImages().forEach(i -> fileStorageService.delete(i, productImageFolder));
        productRepository.deleteById(productId);
    }


    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS.VIEW')")
    public List<AdminProductVariantListResponse> getProductVariants(AdminProductVariantFilterRequest request, Long productId) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "price");

        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<ProductVariant> spec = AdminProductVariantSpecification.build(request, productId);

        Page<ProductVariant> productVariantPage = productVariantRepository.findAll(spec, pageable);

        List<ProductVariant> variants = productVariantPage.getContent();

        return variants.stream()
                .map(v -> {
                    AdminProductVariantListResponse resp = modelMapper.map(v, AdminProductVariantListResponse.class);
                    resp.setVariantImage(ImageNameToImageUrlConverter.convert(v.getVariantImage(), productVariantImageFolder));
                    return resp;
                })
                .toList();

    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS.VIEW')")
    public ProductVariantResponse getProductVariantDetail(Long productVariantId) {
        ProductVariant productVariant = productVariantRepository.findById(productVariantId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));
        productVariant.setVariantImage(ImageNameToImageUrlConverter.convert(productVariant.getVariantImage(), productVariantImageFolder));
        return modelMapper.map(productVariant, ProductVariantResponse.class);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS.CREATE')")
    public void addProductVariant(String productVariantJson, MultipartFile file, Long productId) {
        AdminProductVariantRequest request = JsonParser.parseRequest(productVariantJson, AdminProductVariantRequest.class, objectMapper);

        String variantImage = "";
        if (file != null) {
            try {
                variantImage = fileStorageService.store(file, productVariantImageFolder);
            } catch (Exception e) {
                log.error("Failed to upload thumbnail file {}", file.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        Product product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        List<ProductPromotion> promotions = request.getPromotionIds() != null
                ? productPromotionRepository.findByIdIn(request.getPromotionIds())
                : new ArrayList<>();

        List<GiftProduct> giftProducts = request.getGiftProductIds() != null
                ? giftProductRepository.findByIdIn(request.getGiftProductIds())
                : new ArrayList<>();

        List<AttributeValue> attributeValues = request.getAttributeValueIds() != null
                ? attributeValueRepository.findByIdIn(request.getAttributeValueIds())
                : new ArrayList<>();

        List<Warranty> warranties = request.getWarrantyIds() != null
                ? warrantyRepository.findByIdIn(request.getWarrantyIds())
                : new ArrayList<>();

        ProductVariant productVariant = productMapper.mapToProductVariantEntity(
                request,
                variantImage,
                product,
                promotions,
                giftProducts,
                attributeValues,
                warranties
        );
        product.getProductVariants().add(productVariant);

        String finalVariantImage = variantImage;
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCompletion(int status) {
                if(status == STATUS_ROLLED_BACK){
                    if (StringUtils.hasText(finalVariantImage)) {
                        fileStorageService.delete(finalVariantImage, productVariantImageFolder);
                    }
                }
            }
        });
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS.EDIT')")
    public void editProductVariant(String productVariantJson, MultipartFile file, Long productVariantId) {
        ProductVariant productVariant = productVariantRepository.findById(productVariantId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));
        AdminProductVariantRequest request = JsonParser.parseRequest(productVariantJson, AdminProductVariantRequest.class, objectMapper);

        String variantImage = productVariant.getVariantImage();
        if (file != null) {
            try {
                fileStorageService.store(file, variantImage, productThumbnailFolder);
            } catch (Exception e) {
                log.error("Failed to upload thumbnail file {}", file.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        List<ProductPromotion> promotions = request.getPromotionIds() != null
                ? productPromotionRepository.findByIdIn(request.getPromotionIds())
                : new ArrayList<>();

        List<GiftProduct> giftProducts = request.getGiftProductIds() != null
                ? giftProductRepository.findByIdIn(request.getGiftProductIds())
                : new ArrayList<>();

        List<AttributeValue> attributeValues = request.getAttributeValueIds() != null
                ? attributeValueRepository.findByIdIn(request.getAttributeValueIds())
                : new ArrayList<>();

        List<Warranty> warranties = request.getWarrantyIds() != null
                ? warrantyRepository.findByIdIn(request.getWarrantyIds())
                : new ArrayList<>();

        ProductVariant editedProductVariant = productMapper.mapToProductVariantEntity(
                request,
                variantImage,
                null,
                promotions,
                giftProducts,
                attributeValues,
                warranties
        );
        editedProductVariant.setSku(productVariant.getSku());
        editedProductVariant.setId(productVariantId);
        editedProductVariant.setProduct(productVariant.getProduct());
        productVariantRepository.save(editedProductVariant);

    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS.DELETE')")
    public void deleteProductVariant(Long productVariantId) {
        ProductVariant productVariant = productVariantRepository.findById(productVariantId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));
        fileStorageService.delete(productVariant.getVariantImage(), productImageFolder);
        productVariantRepository.delete(productVariant);
    }

}
