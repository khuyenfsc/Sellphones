package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.*;

public interface AdminProductFilterService {

    PageResponse<AdminProductFilterResponse> getFiltersByCategoryId(AdminProductFilter_FilterRequest request, Long categoryId);
    AdminProductFilterResponse getFilterById(Long id);
    void addProductFilter(AdminProductFilterRequest request, Long categoryId);
    void editProductFilter(AdminProductFilterRequest request, Long id);
    void deleteProductFilter(Long id);
    PageResponse<AdminFilterOptionResponse> getFilterOptions(AdminFilterOptionFilterRequest request, Long filterId);
//    AdminFilterOptionResponse getFilterOptionDetails(Long optionId);
    void addFilterOption(AdminFilterOptionRequest request, Long filterId);
    void editFilterOption(AdminFilterOptionRequest request, Long optionId);
    void deleteFilterOption(Long optionId);
}
