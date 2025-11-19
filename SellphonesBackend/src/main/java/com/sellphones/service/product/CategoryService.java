package com.sellphones.service.product;

import com.sellphones.dto.product.CategoryResponse;
import com.sellphones.dto.product.FeaturedCategoryResponse;
import com.sellphones.dto.product.ProductFilterResponse;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getAllCategories();
//    List<ProductFilterResponse> getProductFiltersByCategoryName(String categoryName);
    List<FeaturedCategoryResponse> getFeaturedCategories();
}
