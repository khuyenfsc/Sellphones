package com.sellphones.service.product;

import com.sellphones.dto.product.ProductFilterResponse;

import java.util.List;

public interface ProductFilterService {
    List<ProductFilterResponse> getProductFiltersByCategoryName(String categoryName);
}
