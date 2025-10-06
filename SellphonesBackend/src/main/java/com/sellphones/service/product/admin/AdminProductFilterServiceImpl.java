package com.sellphones.service.product.admin;

import com.sellphones.dto.product.admin.*;
import com.sellphones.entity.product.FilterOption;
import com.sellphones.entity.product.ProductFilter;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.product.FilterOptionRepository;
import com.sellphones.repository.product.ProductFilterRepository;
import com.sellphones.specification.admin.AdminFilterOptionSpecification;
import com.sellphones.specification.admin.AdminProductFilterSpecification;
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

    private final FilterOptionRepository filterOptionRepository;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCT_FILTERS.VIEW')")
    public List<AdminProductFilterResponse> getProductFilters(AdminProductFilterFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC); // default
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<ProductFilter> spec = AdminProductFilterSpecification.build(request);

        Page<ProductFilter> filterPage = productFilterRepository.findAll(spec, pageable);

        return filterPage.getContent().stream()
                .map(a -> modelMapper.map(a, AdminProductFilterResponse.class))
                .toList();
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCT_FILTERS.CREATE')")
    public void addProductFilter(AdminProductFilterRequest request) {
        ProductFilter filter = ProductFilter.builder()
                .name(request.getName())
                .createdAt(LocalDateTime.now())
                .build();
        productFilterRepository.save(filter);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.PRODUCT_FILTERS.EDIT')")
    public void editProductFilter(AdminProductFilterRequest request, Long id) {
        ProductFilter filter = productFilterRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_FILTER_NOT_FOUND));
        filter.setName(request.getName());
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCT_FILTERS.DELETE')")
    public void deleteProductFilter(Long id) {
        productFilterRepository.deleteById(id);
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.PRODUCT_FILTERS.VIEW')")
    public List<AdminFilterOptionListResponse> getFilterOptions(AdminFilterOptionFilterRequest request, Long filterId) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC); // default
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<FilterOption> spec = AdminFilterOptionSpecification.build(request, filterId);

        Page<FilterOption> filterPage = filterOptionRepository.findAll(spec, pageable);

        return filterPage.getContent().stream()
                .map(a -> modelMapper.map(a, AdminFilterOptionListResponse.class))
                .toList();
    }

    @Override
    public AdminFilterOptionResponse getFilterOptionDetails(Long optionId) {
        FilterOption option = filterOptionRepository.findById(optionId).orElseThrow(() -> new AppException(ErrorCode.FILTER_OPTION_NOT_FOUND));
        return modelMapper.map(option, AdminFilterOptionResponse.class);
    }
}
