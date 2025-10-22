package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.FilterRequest;
import com.sellphones.dto.product.ProductDetailsResponse;
import com.sellphones.dto.product.ProductListResponse;
import com.sellphones.dto.product.ProductVariantResponse;

import java.util.List;

public interface ProductService {
    List<ProductListResponse> getAllProducts();
    List<ProductListResponse> getFeaturedProductsByCategory(String categoryName);
    PageResponse<ProductListResponse> getProductByFilter(FilterRequest filter);
    ProductDetailsResponse getProductById(Long id);
    ProductVariantResponse getProductVariantById(Long id);
}
