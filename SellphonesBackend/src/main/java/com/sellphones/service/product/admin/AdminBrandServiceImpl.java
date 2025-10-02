package com.sellphones.service.product.admin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.dto.product.admin.AdminBrandFilterRequest;
import com.sellphones.dto.product.admin.AdminBrandRequest;
import com.sellphones.dto.product.admin.AdminBrandResponse;
import com.sellphones.dto.product.request.ReviewRequest;
import com.sellphones.entity.product.Brand;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.product.BrandRepository;
import com.sellphones.service.file.FileStorageService;
import com.sellphones.specification.admin.AdminBrandSpecificationBuilder;
import com.sellphones.utils.ImageNameToImageUrlConverter;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
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
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminBrandServiceImpl implements AdminBrandService{

    private final BrandRepository brandRepository;

    private final ModelMapper modelMapper;

    private final ObjectMapper objectMapper;

    private final FileStorageService fileStorageService;

    private final String folderName = "brands";

    @Override
    @PreAuthorize("hasAuthority('CATALOG.BRANDS.VIEW')")
    public List<AdminBrandResponse> getBrands(AdminBrandFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC); // default
        Sort sort = Sort.by(direction, "createdAt");

        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Brand> spec = AdminBrandSpecificationBuilder.build(request);

        Page<Brand> brandPage = brandRepository.findAll(spec, pageable);

        List<Brand> brands = brandPage.getContent();

        return brands.stream()
                .map(b -> {
                    AdminBrandResponse resp = modelMapper.map(b, AdminBrandResponse.class);
                    resp.setBrandIcon(ImageNameToImageUrlConverter.convert(b.getBrandIcon(), folderName));
                    return resp;
                })
                .toList();

    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.BRANDS.CREATE')")
    public void addBrand(String brandJson, MultipartFile file) {
        AdminBrandRequest request = parseRequest(brandJson);

        String fileName = generateFileName(file);

        if (file != null && !fileName.isEmpty()) {
            try {
                fileStorageService.store(file, fileName, folderName);
            } catch (Exception e) {
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        Brand brand = Brand.builder()
                .name(request.getName())
                .brandIcon(fileName.isEmpty() ? null : fileName)
                .createdAt(LocalDateTime.now())
                .build();
        brandRepository.save(brand);

        if (file != null && !fileName.isEmpty()) {
            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCompletion(int status) {
                    if (status == STATUS_ROLLED_BACK) {
                        try {
                            fileStorageService.delete(fileName, folderName);
                        } catch (Exception ex) {
                            log.error("Failed to cleanup file {} after rollback", fileName, ex);
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
        AdminBrandRequest request = parseRequest(brandJson);

        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));

        brand.setName(request.getName());

        if (file != null && !file.isEmpty()) {
            String newFileName = generateFileName(file);
            String oldFileName = brand.getBrandIcon();

            fileStorageService.store(file, newFileName, folderName);

            brand.setBrandIcon(newFileName);

            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCompletion(int status) {
                    if (status == STATUS_ROLLED_BACK) {
                        try {
                            fileStorageService.delete(newFileName, folderName);
                        } catch (Exception e) {
                            log.error("Failed to cleanup new file {} after rollback", newFileName, e);
                        }
                    } else if (status == STATUS_COMMITTED && oldFileName != null) {
                        // Sau khi DB commit thì mới xóa file cũ
                        try {
                            fileStorageService.delete(oldFileName, folderName);
                        } catch (Exception e) {
                            log.error("Failed to delete old file {}", oldFileName, e);
                        }
                    }
                }
            });
        }

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


    private AdminBrandRequest parseRequest(String brandJson) {
        try {
            return objectMapper.readValue(brandJson, AdminBrandRequest.class);
        } catch (JsonProcessingException e) {
            throw new AppException(ErrorCode.INVALID_BRAND_REQUEST_FORMAT);
        }
    }

    private String generateFileName(MultipartFile file) {
        if (file == null || file.getOriginalFilename() == null) {
            return "";
        }
        String ext = FilenameUtils.getExtension(file.getOriginalFilename());
        return UUID.randomUUID() + (ext.isEmpty() ? "" : "." + ext);
    }
}
