package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.*;
import com.sellphones.entity.product.*;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.product.AttributeRepository;
import com.sellphones.repository.product.CategoryRepository;
import com.sellphones.repository.product.FilterOptionRepository;
import com.sellphones.repository.product.ProductFilterRepository;
import com.sellphones.specification.admin.AdminFilterOptionSpecification;
import com.sellphones.specification.admin.AdminProductFilterSpecificationBuilder;
import jakarta.annotation.Nullable;
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
public class AdminProductFilterServiceImpl implements AdminProductFilterService{

    private final ProductFilterRepository productFilterRepository;

    private final CategoryRepository categoryRepository;

    private final FilterOptionRepository filterOptionRepository;

    private final AttributeRepository attributeRepository;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCT_FILTERS.VIEW')")
    public PageResponse<AdminProductFilterResponse> getFiltersByCategoryId(
            AdminProductFilter_FilterRequest request, Long categoryId) {

        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.ASC);
        Sort sort = Sort.by(direction, "name");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<ProductFilter> spec = AdminProductFilterSpecificationBuilder.build(request, categoryId);

        Page<ProductFilter> filterPage = productFilterRepository.findAll(spec, pageable);
        List<ProductFilter> filters = filterPage.getContent();
        List<AdminProductFilterResponse> response = filters.stream()
                .map(f -> modelMapper.map(f, AdminProductFilterResponse.class))
                .toList();

        return PageResponse.<AdminProductFilterResponse>builder()
                .result(response)
                .total(filterPage.getTotalElements())
                .totalPages(filterPage.getTotalPages())
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCT_FILTERS.VIEW')")
    public AdminProductFilterResponse getFilterById(Long id) {
        ProductFilter filter = productFilterRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_FILTER_NOT_FOUND));
        return modelMapper.map(filter, AdminProductFilterResponse.class);
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCT_FILTERS.CREATE')")
    public void addProductFilter(AdminProductFilterRequest request, Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        Attribute attribute = attributeRepository.findById(request.getAttributeId())
                .orElseThrow(() -> new AppException(ErrorCode.ATTRIBUTE_NOT_FOUND));

        ProductFilter filter = ProductFilter.builder()
                .name(request.getName())
                .category(category)
                .attribute(attribute)
                .createdAt(LocalDateTime.now())
                .build();
        productFilterRepository.save(filter);
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCT_FILTERS.EDIT')")
    public void editProductFilter(AdminProductFilterRequest request, Long id) {
        ProductFilter filter = productFilterRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_FILTER_NOT_FOUND));
        Attribute attribute = attributeRepository.findById(request.getAttributeId())
                .orElseThrow(() -> new AppException(ErrorCode.ATTRIBUTE_NOT_FOUND));
        filter.setName(request.getName());
        filter.setAttribute(attribute);

        productFilterRepository.save(filter);
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCT_FILTERS.DELETE')")
    public void deleteProductFilter(Long id) {
        productFilterRepository.deleteById(id);
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCT_FILTERS.VIEW')")
    public PageResponse<AdminFilterOptionResponse> getFilterOptions(AdminFilterOptionFilterRequest request, Long filterId) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "id");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<FilterOption> spec = AdminFilterOptionSpecification.build(request, filterId);

        Page<FilterOption> optionPage = filterOptionRepository.findAll(spec, pageable);
        List<FilterOption> options  = optionPage.getContent();
        List<AdminFilterOptionResponse> response = options.stream()
                .map(o -> modelMapper.map(o, AdminFilterOptionResponse.class))
                .toList();

        return PageResponse.<AdminFilterOptionResponse>builder()
                .result(response)
                .total(optionPage.getTotalElements())
                .totalPages(optionPage.getTotalPages())
                .build();
    }

//    @Override
//    @PreAuthorize("hasAuthority('CATALOG.PRODUCT_FILTERS.VIEW')")
//    public AdminFilterOptionResponse getFilterOptionDetails(Long optionId) {
//        FilterOption option = filterOptionRepository.findById(optionId).orElseThrow(() -> new AppException(ErrorCode.FILTER_OPTION_NOT_FOUND));
//        return modelMapper.map(option, AdminFilterOptionResponse.class);
//    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCT_FILTERS.CREATE')")
    public void addFilterOption(AdminFilterOptionRequest request, Long filterId) {
        ProductFilter filter = productFilterRepository.findById(filterId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_FILTER_NOT_FOUND));
        String condition = convertToCondition(request.getCond(), request.getVal1(), request.getVal2());
        FilterOption option = FilterOption.builder()
                .name(request.getName())
                .productFilter(filter)
                .condition(condition)
                .createdAt(LocalDateTime.now())
                .build();

        filterOptionRepository.save(option);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.PRODUCT_FILTERS.EDIT')")
    public void editFilterOption(AdminFilterOptionRequest request, Long optionId) {
        FilterOption option = filterOptionRepository.findById(optionId).orElseThrow(() -> new AppException(ErrorCode.FILTER_OPTION_NOT_FOUND));
        String condition = convertToCondition(request.getCond(), request.getVal1(), request.getVal2());
        option.setName(request.getName());
        option.setCondition(condition);
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCT_FILTERS.DELETE')")
    public void deleteFilterOption(Long optionId) {
        filterOptionRepository.deleteById(optionId);
    }

    private String convertToCondition(ConditionKey cond, String val1, @Nullable String val2) {
        String condition;
        if(cond != ConditionKey.BETWEEN){
            condition = cond.getCode() + "-" + val1;
        }else{
            if (val2 == null) {
                throw new IllegalArgumentException("Giá trị thứ hai không được null cho điều kiện 'Trong khoảng'");
            }
            condition = val1 + "-" + val2;
        }

        return condition;
    }

}
