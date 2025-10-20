package com.sellphones.service.product;

import com.sellphones.dto.product.CategoryResponse;
import com.sellphones.dto.product.ProductFilterResponse;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getAllCategories();
    List<ProductFilterResponse> getProductFiltersByCategory(Long categoryId);
}
