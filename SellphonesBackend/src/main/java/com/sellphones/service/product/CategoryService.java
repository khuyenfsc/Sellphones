package com.sellphones.service.product;

import com.sellphones.dto.product.response.CategoryResponse;
import com.sellphones.dto.product.response.FilterOptionByCategoryResponse;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getAllCategories();
    List<FilterOptionByCategoryResponse> getFilterOptionsByCategory(Long categoryId);
}
