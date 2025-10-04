package com.sellphones.service.product.admin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.dto.product.admin.AdminBrandRequest;
import com.sellphones.dto.product.admin.AdminProductFilterRequest;
import com.sellphones.dto.product.admin.AdminProductRequest;
import com.sellphones.dto.product.admin.AdminProductVariantFilterRequest;
import com.sellphones.dto.product.response.ProductListResponse;
import com.sellphones.entity.product.*;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.product.AttributeValueRepository;
import com.sellphones.repository.product.BrandRepository;
import com.sellphones.repository.product.CategoryRepository;
import com.sellphones.repository.product.ProductRepository;
import com.sellphones.service.file.FileStorageService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminProductServiceImpl implements AdminProductService{

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private final BrandRepository brandRepository;

    private final AttributeValueRepository attributeValueRepository;

    private final FileStorageService fileStorageService;

    private final String productThumbnailFolder = "product_thumbnails";

    private final String productImageFolder = "product_images";

    private final ObjectMapper objectMapper;

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.PRODUCTS.CREATE')")
    public void addProducts(String productJson, MultipartFile[] imageFiles, MultipartFile thumbnailFile) {
        AdminProductRequest request = parseRequest(productJson);

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

        List<ProductAttributeValue> attributeValues = attributeValueRepository.findByIdIn(request.getAttributeValueIds());
        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        Brand brand = brandRepository.findById(request.getBrandId()).orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));
        Product product = Product.builder()
                .category(category)
                .brand(brand)
                .attributeValues(attributeValues)
                .name(request.getName())
                .description(request.getDescription())
                .thumbnail(thumbnailName)
                .images(imageNames)
                .build();
        productRepository.save(product);

        String finalThumbnailName = thumbnailName;
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCompletion(int status) {
                if(status == STATUS_ROLLED_BACK){
                    if (finalThumbnailName != null) {
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
        AdminProductRequest request = parseRequest(productJson);

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

        List<ProductAttributeValue> attributeValues = attributeValueRepository.findByIdIn(request.getAttributeValueIds());
        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        Brand brand = brandRepository.findById(request.getBrandId()).orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setCategory(category);
        product.setBrand(brand);
        product.setAttributeValues(attributeValues);
        product.setThumbnail(thumbnailName);
        product.setImages(imageNames);

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
                    });
                }
            }
        });
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
    public List<ProductListResponse> getProductVariants(AdminProductVariantFilterRequest request) {
        return null;
    }

    private AdminProductRequest parseRequest(String productJson) {
        try {
            return objectMapper.readValue(productJson, AdminProductRequest.class);
        } catch (JsonProcessingException e) {
            throw new AppException(ErrorCode.INVALID_BRAND_REQUEST_FORMAT);
        }
    }
}
