package com.sellphones.service.product.admin;

import com.sellphones.constant.AppConstants;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.*;
import com.sellphones.entity.product.Category;
import com.sellphones.entity.product.CategoryOption;
import com.sellphones.entity.product.CategoryOptionValue;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.CategoryMapper;
import com.sellphones.repository.product.CategoryOptionRepository;
import com.sellphones.repository.product.CategoryOptionValueRepository;
import com.sellphones.repository.product.CategoryRepository;
import com.sellphones.service.file.FileStorageService;
import com.sellphones.specification.admin.AdminCategoryOptionSpecificationBuilder;
import com.sellphones.specification.admin.AdminCategoryOptionValueSpecificationBuilder;
import com.sellphones.specification.admin.AdminCategorySpecificationBuilder;
import com.sellphones.utils.ImageNameToImageUrlConverter;
import com.sellphones.utils.JsonParser;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
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

    private final FileStorageService fileStorageService;

    private final CategoryMapper categoryMapper;

    private final ModelMapper modelMapper;

    private final JsonParser jsonParser;

    @Override
    @PreAuthorize("""
        hasAnyAuthority(
            'CATALOG.CATEGORIES',
            'CATALOG.PRODUCTS'
        )
    """)
    public PageResponse<AdminCategoryResponse> getCategories(AdminCategory_FilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.ASC); // default
        Sort sort = Sort.by(direction, "name");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Category> spec = AdminCategorySpecificationBuilder.build(request);

        Page<Category> categoryPage = categoryRepository.findAll(spec, pageable);
        List<Category> categories = categoryPage.getContent();
        List<AdminCategoryResponse> response = categories.stream()
                .map(c -> {
                    c.setIcon(ImageNameToImageUrlConverter.convert(c.getIcon(), AppConstants.CATEGORY_IMAGE_FOLDER));
                    return modelMapper.map(c, AdminCategoryResponse.class);
                })
                .toList();

        return PageResponse.<AdminCategoryResponse>builder()
                .result(response)
                .total(categoryPage.getTotalElements())
                .totalPages(categoryPage.getTotalPages())
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES')")
    public AdminCategoryResponse getCategoryById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(()-> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        category.setIcon(ImageNameToImageUrlConverter.convert(category.getIcon(), AppConstants.CATEGORY_IMAGE_FOLDER));
        return modelMapper.map(category, AdminCategoryResponse.class);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES')")
    public void createCategory(String categoryJson, MultipartFile iconFile) {
        AdminCategoryRequest request = jsonParser.parseRequest(categoryJson, AdminCategoryRequest.class);

        String iconName = "";
        if (iconFile != null) {
            try {
                iconName = fileStorageService.store(iconFile, AppConstants.CATEGORY_IMAGE_FOLDER);
            } catch (Exception e) {
                log.error("Failed to upload thumbnail file {}", iconFile.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        Category category = categoryMapper.mapToCategoryEntity(request, iconName);

        try {
            categoryRepository.save(category);
        } catch (DataIntegrityViolationException ex) {
            String message = ex.getMostSpecificCause().getMessage();
            System.out.println("Lỗi: " + message);

            if (message.contains("CATEGORY(NAME") ) {
                throw new AppException(ErrorCode.CATEGORY_NAME_ALREADY_EXISTS);
            }
            else if (message.contains("CATEGORY(CODE")) {
                throw new AppException(ErrorCode.CATEGORY_CODE_ALREADY_EXISTS);
            }
            else {
                throw new AppException(ErrorCode.DATABASE_ERROR);
            }
        }

        String finalIconName = iconName;
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCompletion(int status) {
                if(status == STATUS_ROLLED_BACK){
                    if (StringUtils.hasText(finalIconName)) {
                        fileStorageService.delete(finalIconName, AppConstants.CATEGORY_IMAGE_FOLDER);
                    }
                }
            }
        });
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES')")
    public void updateCategory(String categoryJson, MultipartFile iconFile, Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ATTRIBUTE_NOT_FOUND));
        AdminCategoryRequest request = jsonParser.parseRequest(categoryJson, AdminCategoryRequest.class);

        String iconName = category.getIcon();
        if (iconFile != null) {
            try {
                if (iconName != null && !iconName.isEmpty()) {
                    fileStorageService.store(iconFile, iconName, AppConstants.CATEGORY_IMAGE_FOLDER);
                } else {
                    iconName = fileStorageService.store(iconFile, AppConstants.CATEGORY_IMAGE_FOLDER);
                }
            } catch (Exception e) {
                log.error("Failed to upload icon file {}", iconFile.getOriginalFilename(), e);
                throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        category.setName(request.getName());
        category.setCode(request.getCode());
        category.setIcon(iconName);
        category.setFeaturedOnHomepage(request.getFeaturedOnHomepage());
        categoryRepository.save(category);
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES')")
    public void deleteCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new AppException(ErrorCode.ATTRIBUTE_NOT_FOUND));
        String iconName = category.getIcon();

        categoryRepository.deleteById(categoryId);

        if(iconName != null && !iconName.isEmpty()){
            fileStorageService.delete(iconName, AppConstants.CATEGORY_IMAGE_FOLDER);
        }
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES')")
    public PageResponse<AdminCategoryOptionResponse> getOptionsByCategoryId(AdminCategoryOption_FilterRequest request, Long categoryId) {
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
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES')")
    public AdminCategoryOptionResponse getOptionById(Long id) {
        CategoryOption option = categoryOptionRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_OPTION_NOT_FOUND));
        return modelMapper.map(option, AdminCategoryOptionResponse.class);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES')")
    public void createOption(AdminCategoryOptionRequest request, Long categoryId) {
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
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES')")
    public void updateOption(AdminCategoryOptionRequest request, Long categoryOptionId) {
        CategoryOption categoryOption = categoryOptionRepository.findById(categoryOptionId).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_OPTION_NOT_FOUND));
        categoryOption.setName(request.getName());
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES')")
    public void deleteOption(Long id) {
        categoryOptionRepository.deleteById(id);
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES')")
    public PageResponse<AdminCategoryOptionValueResponse> getValuesByOptionId(AdminCategoryOptionValue_FilterRequest request, Long optionId) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.ASC);
        Sort sort = Sort.by(direction, "id");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<CategoryOptionValue> spec = AdminCategoryOptionValueSpecificationBuilder.build(request, optionId);

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
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES')")
    public void createValue(AdminCategoryOptionValueRequest request, Long optionId) {
        CategoryOption option = categoryOptionRepository.findById(optionId).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_OPTION_NOT_FOUND));
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
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES')")
    public void updateValue(AdminCategoryOptionValueRequest request, Long id) {
        CategoryOptionValue optionValue = categoryOptionValueRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_OPTION_VALUE_NOT_FOUND));
        optionValue.setName(request.getName());
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES')")
    public void deleteValue(Long id) {
        categoryOptionValueRepository.deleteById(id);
    }
}
