package com.sellphones.service.promotion.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.promotion.admin.AdminPromotionBannerFilterRequest;
import com.sellphones.dto.promotion.admin.AdminPromotionBannerRequest;
import com.sellphones.dto.promotion.admin.AdminPromotionBannerResponse;
import com.sellphones.entity.promotion.PromotionBanner;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.PromotionBannerMapper;
import com.sellphones.repository.promotion.PromotionBannerRepository;
import com.sellphones.service.file.FileStorageService;
import com.sellphones.specification.admin.AdminPromotionBannerSpecificationBuilder;
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
public class AdminPromotionBannerServiceImpl implements AdminPromotionBannerService{

    private final PromotionBannerRepository promotionBannerRepository;

    private final String promotionBannerFolderName = "promotion_banners";

    private final ModelMapper modelMapper;

    private final JsonParser jsonParser;

    private final ObjectMapper objectMapper;

    private final PromotionBannerMapper promotionBannerMapper;

    private final FileStorageService fileStorageService;

    @Override
    @PreAuthorize("hasAuthority('PROMOTIONS.BANNERS.VIEW')")
    public PageResponse<AdminPromotionBannerResponse> getBanners(AdminPromotionBannerFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "id");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<PromotionBanner> spec = AdminPromotionBannerSpecificationBuilder.build(request);

        Page<PromotionBanner> bannerPage = promotionBannerRepository.findAll(spec, pageable);
        List<PromotionBanner> banners = bannerPage.getContent();
        List<AdminPromotionBannerResponse> response = banners.stream()
                .map(b -> {
                            b.setImage(ImageNameToImageUrlConverter.convert(b.getImage(), promotionBannerFolderName));
                            return modelMapper.map(b, AdminPromotionBannerResponse.class);
                        }
                )
                .toList();

        return PageResponse.<AdminPromotionBannerResponse>builder()
                .result(response)
                .total(bannerPage.getTotalElements())
                .totalPages(bannerPage.getTotalPages())
                .build();
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('PROMOTIONS.BANNERS.CREATE')")
    public void createBanner(String bannerJson, MultipartFile imageFile) {
        AdminPromotionBannerRequest request = jsonParser.parseRequest(bannerJson, AdminPromotionBannerRequest.class);

        String imageName = "";
        if (imageFile != null) {
            try {
                imageName = fileStorageService.store(imageFile, promotionBannerFolderName);
            } catch (Exception e) {
                log.error("Failed to upload thumbnail file {}", imageFile.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        PromotionBanner banner = promotionBannerMapper.mapToBannerEntity(request, imageName);
        promotionBannerRepository.save(banner);

        String finalImageName = imageName;
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCompletion(int status) {
                if(status == STATUS_ROLLED_BACK){
                    if (StringUtils.hasText(finalImageName)) {
                        fileStorageService.delete(finalImageName, promotionBannerFolderName);
                    }
                }
            }
        });
    }

    @Override
    @PreAuthorize("hasAuthority('PROMOTIONS.BANNERS.EDIT')")
    public void editBanner(String bannerJson, MultipartFile imageFile, Long id) {
        PromotionBanner banner = promotionBannerRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PROMOTION_BANNER_NOT_FOUND));
        AdminPromotionBannerRequest request = jsonParser.parseRequest(bannerJson, AdminPromotionBannerRequest.class);

        String imageName = banner.getImage();
        if (imageFile != null) {
            try {
                if (imageName != null && !imageName.isEmpty()) {
                    fileStorageService.store(imageFile, imageName, promotionBannerFolderName);
                } else {
                    imageName = fileStorageService.store(imageFile, promotionBannerFolderName);
                }
            } catch (Exception e) {
                log.error("Failed to upload icon file {}", imageFile.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        PromotionBanner editedBanner = promotionBannerMapper.mapToBannerEntity(request, imageName);
        editedBanner.setId(id);
        editedBanner.setCreatedAt(banner.getCreatedAt());
        promotionBannerRepository.save(editedBanner);
    }

    @Override
    @PreAuthorize("hasAuthority('PROMOTIONS.BANNERS.DELETE')")
    public void deleteBanner(Long id) {
        PromotionBanner banner = promotionBannerRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PROMOTION_BANNER_NOT_FOUND));
        String imageName = banner.getImage();

        promotionBannerRepository.delete(banner);

        if(imageName != null && !imageName.isEmpty()){
            fileStorageService.delete(imageName, promotionBannerFolderName);
        }
    }
}
