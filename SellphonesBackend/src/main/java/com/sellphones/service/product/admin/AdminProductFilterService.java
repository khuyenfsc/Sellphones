package com.sellphones.service.product.admin;

import com.sellphones.dto.product.admin.*;

import java.util.List;

public interface AdminProductFilterService {

    List<AdminProductFilterResponse> getProductFilters(AdminProductFilterFilterRequest request);

    void addProductFilter(AdminProductFilterRequest request);
    void editProductFilter(AdminProductFilterRequest request, Long id);
    void deleteProductFilter(Long id);
    List<AdminFilterOptionResponse> getFilterOptions(AdminFilterOptionFilterRequest request, Long filterId);
//    AdminFilterOptionResponse getFilterOptionDetails(Long optionId);
    void addFilterOption(AdminFilterOptionRequest request, Long filterId);
    void editFilterOption(AdminFilterOptionRequest request, Long optionId);
    void deleteFilterOption(Long optionId);
}
