package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AdminCategoryService {
    PageResponse<AdminCategoryResponse> getCategories(AdminCategoryFilterRequest request);
    void addCategory(String categoryJson, MultipartFile iconFile);
    void editCategory(String categoryJson, MultipartFile iconName, Long id);
    void deleteCategory(Long categoryId);
    PageResponse<AdminCategoryOptionResponse> getCategoryOptions(AdminCategoryOptionFilterRequest request, Long categoryId);
    void addCategoryOption(AdminCategoryOptionRequest request, Long categoryId);
    void editCategoryOption(AdminCategoryOptionRequest request, Long categoryId);
    void deleteCategoryOption(Long categoryOptionId);
    PageResponse<AdminCategoryOptionValueResponse> getCategoryOptionValues(AdminCategoryOptionValueFilterRequest request, Long categoryOptionId);
    void addCategoryOptionValue(AdminCategoryOptionValueRequest request, Long categoryOptionId);
    void editCategoryOptionValue(AdminCategoryOptionValueRequest request, Long categoryOptionId);
    void deleteCategoryOptionValue(Long categoryOptionValueId);
}
