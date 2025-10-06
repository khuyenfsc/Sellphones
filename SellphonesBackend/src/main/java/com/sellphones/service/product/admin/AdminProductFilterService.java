package com.sellphones.service.product.admin;

import com.sellphones.dto.product.admin.*;

import java.util.List;

public interface AdminProductFilterService {

    List<AdminProductFilterResponse> getProductFilters(AdminProductFilterFilterRequest request);

    void addProductFilter(AdminProductFilterRequest request);
    void editProductFilter(AdminProductFilterRequest request, Long id);
    void deleteProductFilter(Long id);
    List<AdminFilterOptionListResponse> getFilterOptions(AdminFilterOptionFilterRequest request, Long filterId);
    AdminFilterOptionResponse getFilterOptionDetails(Long optionId);
}
