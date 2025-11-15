package com.sellphones.service.promotion.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.promotion.admin.AdminGiftProductFilterRequest;
import com.sellphones.dto.promotion.admin.AdminGiftProductRequest;
import com.sellphones.dto.promotion.admin.AdminGiftProductResponse;
import com.sellphones.entity.promotion.GiftProduct;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.GIftProductMapper;
import com.sellphones.repository.promotion.GiftProductRepository;
import com.sellphones.service.file.FileStorageService;
import com.sellphones.specification.admin.AdminGiftProductSpecificationBuilder;
import com.sellphones.utils.ImageNameToImageUrlConverter;
import com.sellphones.utils.JsonParser;
import jakarta.transaction.Transactional;
import jakarta.validation.Validator;
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

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminGiftProductServiceImpl implements AdminGiftProductService{

    private final GiftProductRepository giftProductRepository;

    private final GIftProductMapper gIftProductMapper;

    private final FileStorageService fileStorageService;

    private final ModelMapper modelMapper;

    private final ObjectMapper objectMapper;

    private final JsonParser jsonParser;

    private final String giftProductFolderName = "gift_products";

    @Override
    @PreAuthorize("hasAuthority('PROMOTIONS.GIFT_PRODUCTS.VIEW')")
    public PageResponse<AdminGiftProductResponse> getGiftProducts(AdminGiftProductFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC); // default
        Sort sort = Sort.by(direction, "price");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<GiftProduct> spec = AdminGiftProductSpecificationBuilder.build(request);

        Page<GiftProduct> giftProductPage = giftProductRepository.findAll(spec, pageable);
        List<GiftProduct> giftProducts = giftProductPage.getContent();
        List<AdminGiftProductResponse> response = giftProducts.stream()
                .map(gp -> {
                        gp.setThumbnail(ImageNameToImageUrlConverter.convert(gp.getThumbnail(), giftProductFolderName));
                        return modelMapper.map(gp, AdminGiftProductResponse.class);
                    }
                )
                .toList();

        return PageResponse.<AdminGiftProductResponse>builder()
                .result(response)
                .total(giftProductPage.getTotalElements())
                .totalPages(giftProductPage.getTotalPages())
                .build();
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('PROMOTIONS.GIFT_PRODUCTS.CREATE')")
    public void createGiftProduct(String giftProductJson, MultipartFile thumbnailFile) {
        AdminGiftProductRequest request = jsonParser.parseRequest(giftProductJson, AdminGiftProductRequest.class);
        String thumbnailName = "";
        if (thumbnailFile != null) {
            try {
                thumbnailName = fileStorageService.store(thumbnailFile, giftProductFolderName);
            } catch (Exception e) {
                log.error("Failed to upload thumbnail file {}", thumbnailFile.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        GiftProduct giftProduct = gIftProductMapper.mapToGiftProductEntity(request, thumbnailName);
        giftProductRepository.save(giftProduct);

        String finalThumbnailName = thumbnailName;
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCompletion(int status) {
                if(status == STATUS_ROLLED_BACK){
                    if (StringUtils.hasText(finalThumbnailName)) {
                        fileStorageService.delete(finalThumbnailName, giftProductFolderName);
                    }
                }
            }
        });
    }

    @Override
    @PreAuthorize("hasAuthority('PROMOTIONS.GIFT_PRODUCTS.EDIT')")
    public void editGiftProduct(String giftProductJson, MultipartFile thumbnailFile, Long id) {
        GiftProduct giftProduct = giftProductRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.GIFT_PRODUCT_NOT_FOUND));
        AdminGiftProductRequest request = jsonParser.parseRequest(giftProductJson, AdminGiftProductRequest.class);

        String thumbnailName = giftProduct.getThumbnail();
        if (thumbnailFile != null) {
            try {
                if (thumbnailName != null && !thumbnailName.isEmpty()) {
                    fileStorageService.store(thumbnailFile, thumbnailName, giftProductFolderName);
                } else {
                    thumbnailName = fileStorageService.store(thumbnailFile, giftProductFolderName);
                }
            } catch (Exception e) {
                log.error("Failed to upload icon file {}", thumbnailFile.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        GiftProduct editedGiftProduct = gIftProductMapper.mapToGiftProductEntity(request, thumbnailName);
        editedGiftProduct.setId(id);
        editedGiftProduct.setCreatedAt(giftProduct.getCreatedAt());
        giftProductRepository.save(editedGiftProduct);
    }

    @Override
    @PreAuthorize("hasAuthority('PROMOTIONS.GIFT_PRODUCTS.DELETE')")
    public void deleteGiftProduct(Long id) {
        GiftProduct giftProduct = giftProductRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.GIFT_PRODUCT_NOT_FOUND));
        String thumbnailName = giftProduct.getThumbnail();

        giftProductRepository.delete(giftProduct);

        if(thumbnailName != null && !thumbnailName.isEmpty()){
            fileStorageService.delete(thumbnailName, giftProductFolderName);
        }
    }
}
