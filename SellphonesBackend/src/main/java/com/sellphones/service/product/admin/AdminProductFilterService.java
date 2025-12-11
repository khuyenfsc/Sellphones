package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.*;

public interface AdminProductFilterService {

    PageResponse<AdminProductFilterResponse> getFiltersByCategoryId(AdminProductFilter_FilterRequest request, Long categoryId);
    AdminProductFilterResponse getFilterById(Long id);
    void createFilter(AdminProductFilterRequest request, Long categoryId);
    void updateFilter(AdminProductFilterRequest request, Long id);
    void deleteFilter(Long id);
    PageResponse<AdminFilterOptionDetailsResponse> getFilterOptions(AdminFilterOption_FilterRequest request, Long filterId);
//    AdminFilterOptionResponse getFilterOptionDetails(Long optionId);
    void createOption(AdminFilterOptionRequest request, Long filterId);
    void updateOption(AdminFilterOptionRequest request, Long id);
    void deleteOption(Long id);
}
