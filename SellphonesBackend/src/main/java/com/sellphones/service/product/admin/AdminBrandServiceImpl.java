package com.sellphones.service.product.admin;

import com.sellphones.constant.AppConstants;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminBrand_FilterRequest;
import com.sellphones.dto.product.admin.AdminBrandRequest;
import com.sellphones.dto.product.admin.AdminBrandResponse;
import com.sellphones.entity.product.Brand;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.BrandMapper;
import com.sellphones.repository.product.BrandRepository;
import com.sellphones.service.file.FileStorageService;
import com.sellphones.specification.admin.AdminBrandSpecificationBuilder;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminBrandServiceImpl implements AdminBrandService{

    private final BrandRepository brandRepository;

    private final ModelMapper modelMapper;

    private final JsonParser jsonParser;

    private final FileStorageService fileStorageService;

    private final BrandMapper brandMapper;

    @Override
    @PreAuthorize("""
            hasAnyAuthority(
                'CATALOG.BRANDS',
                'CATALOG.PRODUCTS',
                'CATALOG.PRODUCTS'
            )
    """)
    public PageResponse<AdminBrandResponse> getBrands(AdminBrand_FilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.ASC);
        Sort sort = Sort.by(direction, "name");

        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Brand> spec = AdminBrandSpecificationBuilder.build(request);

        Page<Brand> brandPage = brandRepository.findAll(spec, pageable);

        List<Brand> brands = brandPage.getContent();

        List<AdminBrandResponse> response =  brands.stream()
                .map(b -> {
                    AdminBrandResponse resp = modelMapper.map(b, AdminBrandResponse.class);
                    resp.setBrandIcon(ImageNameToImageUrlConverter.convert(b.getBrandIcon(), AppConstants.BRAND_IMAGE_FOLDER));
                    return resp;
                })
                .toList();

        return PageResponse.<AdminBrandResponse>builder()
                .result(response)
                .total(brandPage.getTotalElements())
                .totalPages(brandPage.getTotalPages())
                .build();

    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.BRANDS')")
    public void createBrand(String brandJson, MultipartFile iconFile) {
        AdminBrandRequest request = jsonParser.parseRequest(brandJson, AdminBrandRequest.class);
        String iconName = "";

        if (iconFile != null) {
            try {
                iconName = fileStorageService.store(iconFile, AppConstants.BRAND_IMAGE_FOLDER);
            } catch (Exception e) {
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        Brand brand = brandMapper.mapToBranEntity(request, iconName);
        brandRepository.save(brand);

        if (iconFile != null && !iconName.isEmpty()) {
            String finalFileName = iconName;
            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCompletion(int status) {
                    if (status == STATUS_ROLLED_BACK) {
                        try {
                            fileStorageService.delete(finalFileName, AppConstants.BRAND_IMAGE_FOLDER);
                        } catch (Exception ex) {
                            log.error("Failed to cleanup file {} after rollback", finalFileName, ex);
                        }
                    }
                }
            });
        }
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.BRANDS')")
    public void updateBrand(String brandJson, MultipartFile iconFile, Long id) {
        AdminBrandRequest request = jsonParser.parseRequest(brandJson, AdminBrandRequest.class);

        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));

        String iconName = brand.getBrandIcon();
        if (iconFile != null) {
            try {
                if (iconName != null && !iconName.isEmpty()) {
                    fileStorageService.store(iconFile, iconName, AppConstants.BRAND_IMAGE_FOLDER);
                } else {
                    iconName = fileStorageService.store(iconFile, AppConstants.BRAND_IMAGE_FOLDER);
                }
            } catch (Exception e) {
                log.error("Failed to upload icon file {}", iconFile.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        Brand editedBrand = brandMapper.mapToBranEntity(request, iconName);
        editedBrand.setId(id);
        editedBrand.setCreatedAt(brand.getCreatedAt());

        brandRepository.save(editedBrand);
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.BRANDS')")
    public void deleteBrand(Long id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));

        String fileName = brand.getBrandIcon();
        brandRepository.delete(brand);
        if(fileName != null && !fileName.isEmpty()){
            fileStorageService.delete(fileName, AppConstants.BRAND_IMAGE_FOLDER);
        }
    }


}
