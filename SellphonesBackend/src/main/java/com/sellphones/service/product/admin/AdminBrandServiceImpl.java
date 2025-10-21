package com.sellphones.service.product.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminBrandFilterRequest;
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
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminBrandServiceImpl implements AdminBrandService{

    private final BrandRepository brandRepository;

    private final ModelMapper modelMapper;

    private final ObjectMapper objectMapper;

    private final Validator validator;

    private final FileStorageService fileStorageService;

    private final BrandMapper brandMapper;

    private final String folderName = "brands";

    @Override
    @PreAuthorize("hasAuthority('CATALOG.BRANDS.VIEW')")
    public PageResponse<AdminBrandResponse> getBrands(AdminBrandFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC); // default
        Sort sort = Sort.by(direction, "createdAt");

        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Brand> spec = AdminBrandSpecificationBuilder.build(request);

        Page<Brand> brandPage = brandRepository.findAll(spec, pageable);

        List<Brand> brands = brandPage.getContent();

        List<AdminBrandResponse> response =  brands.stream()
                .map(b -> {
                    AdminBrandResponse resp = modelMapper.map(b, AdminBrandResponse.class);
                    resp.setBrandIcon(ImageNameToImageUrlConverter.convert(b.getBrandIcon(), folderName));
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
    @PreAuthorize("hasAuthority('CATALOG.BRANDS.CREATE')")
    public void addBrand(String brandJson, MultipartFile file) {
        AdminBrandRequest request = JsonParser.parseRequest(brandJson, AdminBrandRequest.class, objectMapper, validator);
        String fileName = "";

        if (file != null) {
            try {
                fileName = fileStorageService.store(file, folderName);
            } catch (Exception e) {
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        Brand brand = brandMapper.mapToBranEntity(request, fileName);
        brandRepository.save(brand);

        if (file != null && !fileName.isEmpty()) {
            String finalFileName = fileName;
            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCompletion(int status) {
                    if (status == STATUS_ROLLED_BACK) {
                        try {
                            fileStorageService.delete(finalFileName, folderName);
                        } catch (Exception ex) {
                            log.error("Failed to cleanup file {} after rollback", finalFileName, ex);
                        }
                    }
                }
            });
        }
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.BRANDS.EDIT')")
    public void editBrand(String brandJson, MultipartFile file, Long id) {
        AdminBrandRequest request = JsonParser.parseRequest(brandJson, AdminBrandRequest.class, objectMapper, validator);

        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));

        String iconName = brand.getBrandIcon();
        if (file != null) {
            try {
                if (iconName != null && !iconName.isEmpty()) {
                    fileStorageService.store(file, iconName, folderName);
                } else {
                    iconName = fileStorageService.store(file, folderName);
                }
            } catch (Exception e) {
                log.error("Failed to upload icon file {}", file.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        Brand editedBrand = brandMapper.mapToBranEntity(request, iconName);
        brand.setId(id);
        brand.setCreatedAt(brand.getCreatedAt());

        brandRepository.save(editedBrand);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.BRANDS.DELETE')")
    public void deleteBrand(Long id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));

        String fileName = brand.getBrandIcon();

        brandRepository.delete(brand);

        if (fileName != null && !fileName.isBlank()) {
            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCompletion(int status) {
                    if (status == STATUS_COMMITTED) {
                        try {
                            fileStorageService.delete(fileName, folderName);
                        } catch (Exception e) {
                            log.error("Failed to delete brand icon {}", fileName, e);
                        }
                    }
                }
            });
        }
    }


}
