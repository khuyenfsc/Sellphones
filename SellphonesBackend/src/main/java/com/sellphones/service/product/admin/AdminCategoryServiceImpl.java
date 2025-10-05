package com.sellphones.service.product.admin;

import com.sellphones.dto.product.admin.*;
import com.sellphones.entity.product.Category;
import com.sellphones.entity.product.CategoryOption;
import com.sellphones.entity.product.CategoryOptionValue;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.product.CategoryOptionRepository;
import com.sellphones.repository.product.CategoryOptionValueRepository;
import com.sellphones.repository.product.CategoryRepository;
import com.sellphones.repository.product.ProductRepository;
import com.sellphones.specification.admin.AdminCategoryOptionSpecificationBuilder;
import com.sellphones.specification.admin.AdminCategoryOptionValueSpecificationBuilder;
import com.sellphones.specification.admin.AdminCategorySpecificationBuilder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminCategoryServiceImpl implements AdminCategoryService{

    private final CategoryRepository categoryRepository;

    private final CategoryOptionRepository categoryOptionRepository;

    private final CategoryOptionValueRepository categoryOptionValueRepository;

    private final ProductRepository productRepository;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES.VIEW')")
    public List<AdminCategoryResponse> getCategories(AdminCategoryFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC); // default
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Category> spec = AdminCategorySpecificationBuilder.build(request);

        Page<Category> attributePage = categoryRepository.findAll(spec, pageable);

        return attributePage.getContent().stream()
                .map(a -> modelMapper.map(a, AdminCategoryResponse.class))
                .toList();
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES.CREATE')")
    public void addCategory(AdminCategoryRequest request) {
        Category category = Category.builder()
                        .name(request.getName())
                        .code(request.getCode())
                        .createdAt(LocalDateTime.now())
                        .build();
        categoryRepository.save(category);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES.EDIT')")
    public void editCategory(AdminCategoryRequest request, Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new AppException(ErrorCode.ATTRIBUTE_NOT_FOUND));
        category.setName(request.getName());;
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES.DELETE')")
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.CATEGORIES.VIEW')")
    public List<AdminCategoryOptionResponse> getCategoryOptions(AdminCategoryOptionFilterRequest request, Long categoryId) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<CategoryOption> spec = AdminCategoryOptionSpecificationBuilder.build(request, categoryId);

        Page<CategoryOption> optionPage = categoryOptionRepository.findAll(spec, pageable);

        return optionPage.getContent().stream()
                .map(a -> modelMapper.map(a, AdminCategoryOptionResponse.class))
                .toList();
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
    public List<AdminCategoryOptionValueResponse> getCategoryOptionValues(AdminCategoryOptionValueFilterRequest request, Long categoryOptionId) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<CategoryOptionValue> spec = AdminCategoryOptionValueSpecificationBuilder.build(request, categoryOptionId);

        Page<CategoryOptionValue> optionValuePage = categoryOptionValueRepository.findAll(spec, pageable);

        return optionValuePage.getContent().stream()
                .map(a -> modelMapper.map(a, AdminCategoryOptionValueResponse.class))
                .toList();
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
