package com.sellphones.service.product.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.AdminInventoryResponse;
import com.sellphones.dto.product.admin.*;
import com.sellphones.entity.inventory.Inventory;
import com.sellphones.entity.product.Category;
import com.sellphones.entity.product.CategoryOption;
import com.sellphones.entity.product.CategoryOptionValue;
import com.sellphones.entity.promotion.GiftProduct;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.CategoryMapper;
import com.sellphones.repository.product.CategoryOptionRepository;
import com.sellphones.repository.product.CategoryOptionValueRepository;
import com.sellphones.repository.product.CategoryRepository;
import com.sellphones.repository.product.ProductRepository;
import com.sellphones.service.file.FileStorageService;
import com.sellphones.specification.admin.AdminCategoryOptionSpecificationBuilder;
import com.sellphones.specification.admin.AdminCategoryOptionValueSpecificationBuilder;
import com.sellphones.specification.admin.AdminCategorySpecificationBuilder;
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

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminCategoryServiceImpl implements AdminCategoryService{

    private final CategoryRepository categoryRepository;

    private final CategoryOptionRepository categoryOptionRepository;

    private final CategoryOptionValueRepository categoryOptionValueRepository;

    private final ProductRepository productRepository;

    private final FileStorageService fileStorageService;

    private final CategoryMapper categoryMapper;

    private final ModelMapper modelMapper;

    private final ObjectMapper objectMapper;

    private final Validator validator;

    private final String categoryIconFolderName = "category_icons";

    @Override
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES.VIEW')")
    public PageResponse<AdminCategoryResponse> getCategories(AdminCategoryFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC); // default
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Category> spec = AdminCategorySpecificationBuilder.build(request);

        Page<Category> categoryPage = categoryRepository.findAll(spec, pageable);
        List<Category> categories = categoryPage.getContent();
        List<AdminCategoryResponse> response = categories.stream()
                .map(c -> modelMapper.map(c, AdminCategoryResponse.class))
                .toList();

        return PageResponse.<AdminCategoryResponse>builder()
                .result(response)
                .total(categoryPage.getTotalElements())
                .totalPages(categoryPage.getTotalPages())
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES.CREATE')")
    public void addCategory(String categoryJson, MultipartFile iconFile) {
        AdminCategoryRequest request = JsonParser.parseRequest(categoryJson, AdminCategoryRequest.class, objectMapper, validator);
        String iconName = "";
        if (iconFile != null) {
            try {
                iconName = fileStorageService.store(iconFile, categoryIconFolderName);
            } catch (Exception e) {
                log.error("Failed to upload thumbnail file {}", iconFile.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        Category category = categoryMapper.mapToCategoryEntity(request, iconName);

        categoryRepository.save(category);

        String finalIconName = iconName;
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCompletion(int status) {
                if(status == STATUS_ROLLED_BACK){
                    if (StringUtils.hasText(finalIconName)) {
                        fileStorageService.delete(finalIconName, categoryIconFolderName);
                    }
                }
            }
        });
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES.EDIT')")
    public void editCategory(String categoryJson, MultipartFile iconFile, Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ATTRIBUTE_NOT_FOUND));
        AdminCategoryRequest request = JsonParser.parseRequest(categoryJson, AdminCategoryRequest.class, objectMapper, validator);

        String iconName = category.getIcon();
        if (iconFile != null) {
            try {
                if (iconName != null && !iconName.isEmpty()) {
                    fileStorageService.store(iconFile, iconName, categoryIconFolderName);
                } else {
                    iconName = fileStorageService.store(iconFile, categoryIconFolderName);
                }
            } catch (Exception e) {
                log.error("Failed to upload icon file {}", iconFile.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        Category editedCategory = categoryMapper.mapToCategoryEntity(request, iconName);
        editedCategory.setId(id);
        editedCategory.setCreatedAt(category.getCreatedAt());
        categoryRepository.save(editedCategory);
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES.DELETE')")
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES.VIEW')")
    public PageResponse<AdminCategoryOptionResponse> getCategoryOptions(AdminCategoryOptionFilterRequest request, Long categoryId) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<CategoryOption> spec = AdminCategoryOptionSpecificationBuilder.build(request, categoryId);

        Page<CategoryOption> optionPage = categoryOptionRepository.findAll(spec, pageable);
        List<CategoryOption> options = optionPage.getContent();
        List<AdminCategoryOptionResponse> response = options.stream()
                .map(o -> modelMapper.map(o, AdminCategoryOptionResponse.class))
                .toList();

        return PageResponse.<AdminCategoryOptionResponse>builder()
                .result(response)
                .total(optionPage.getTotalElements())
                .totalPages(optionPage.getTotalPages())
                .build();
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES.CREATE')")
    public void addCategoryOption(AdminCategoryOptionRequest request, Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        CategoryOption option = CategoryOption
                .builder()
                .category(category)
                .name(request.getName())
                .createdAt(LocalDateTime.now())
                .build();
        category.getCategoryOptions().add(option);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES.EDIT')")
    public void editCategoryOption(AdminCategoryOptionRequest request, Long categoryOptionId) {
        CategoryOption categoryOption = categoryOptionRepository.findById(categoryOptionId).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_OPTION_NOT_FOUND));
        categoryOption.setName(request.getName());
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES.DELETE')")
    public void deleteCategoryOption(Long categoryOptionId) {
        categoryOptionRepository.deleteById(categoryOptionId);
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES.VIEW')")
    public PageResponse<AdminCategoryOptionValueResponse> getCategoryOptionValues(AdminCategoryOptionValueFilterRequest request, Long categoryOptionId) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<CategoryOptionValue> spec = AdminCategoryOptionValueSpecificationBuilder.build(request, categoryOptionId);

        Page<CategoryOptionValue> optionValuePage = categoryOptionValueRepository.findAll(spec, pageable);
        List<CategoryOptionValue> optionValues = optionValuePage.getContent();
        List<AdminCategoryOptionValueResponse> response = optionValues.stream()
                .map(v -> modelMapper.map(v, AdminCategoryOptionValueResponse.class))
                .toList();

        return PageResponse.<AdminCategoryOptionValueResponse>builder()
                .result(response)
                .total(optionValuePage.getTotalElements())
                .totalPages(optionValuePage.getTotalPages())
                .build();
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES.CREATE')")
    public void addCategoryOptionValue(AdminCategoryOptionValueRequest request, Long categoryOptionId) {
        CategoryOption option = categoryOptionRepository.findById(categoryOptionId).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_OPTION_NOT_FOUND));
        CategoryOptionValue optionValue = CategoryOptionValue
                .builder()
                .categoryOption(option)
                .name(request.getName())
                .createdAt(LocalDateTime.now())
                .build();
        option.getCategoryOptionValues().add(optionValue);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES.EDIT')")
    public void editCategoryOptionValue(AdminCategoryOptionValueRequest request, Long categoryOptionValueId) {
        CategoryOptionValue optionValue = categoryOptionValueRepository.findById(categoryOptionValueId).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_OPTION_VALUE_NOT_FOUND));
        optionValue.setName(request.getName());
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES.DELETE')")
    public void deleteCategoryOptionValue(Long categoryOptionValueId) {
        categoryOptionValueRepository.deleteById(categoryOptionValueId);
    }
}
