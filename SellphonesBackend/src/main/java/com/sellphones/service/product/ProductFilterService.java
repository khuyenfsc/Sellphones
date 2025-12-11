package com.sellphones.service.product;

import com.sellphones.dto.product.Product_FilterResponse;

import java.util.List;

public interface ProductFilterService {
    List<Product_FilterResponse> getProductFiltersByCategoryName(String categoryName);
}
