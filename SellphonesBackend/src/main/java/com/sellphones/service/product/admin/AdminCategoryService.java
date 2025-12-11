package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.*;
import org.springframework.web.multipart.MultipartFile;

public interface AdminCategoryService {
    PageResponse<AdminCategoryResponse> getCategories(AdminCategory_FilterRequest request);
    AdminCategoryResponse getCategoryById(Long categoryId);
    void createCategory(String categoryJson, MultipartFile iconFile);
    void updateCategory(String categoryJson, MultipartFile iconName, Long id);
    void deleteCategory(Long categoryId);
    PageResponse<AdminCategoryOptionResponse> getOptionsByCategoryId(AdminCategoryOption_FilterRequest request, Long categoryId);
    AdminCategoryOptionResponse getOptionById(Long id);
    void createOption(AdminCategoryOptionRequest request, Long categoryId);
    void updateOption(AdminCategoryOptionRequest request, Long id);
    void deleteOption(Long id);
    PageResponse<AdminCategoryOptionValueResponse> getValuesByOptionId(AdminCategoryOptionValue_FilterRequest request, Long optionId);
    void createValue(AdminCategoryOptionValueRequest request, Long optionId);
    void updateValue(AdminCategoryOptionValueRequest request, Long id);
    void deleteValue(Long id);
}
