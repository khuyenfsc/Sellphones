package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.request.FilterRequest;
import com.sellphones.dto.product.response.ProductDetailsResponse;
import com.sellphones.dto.product.response.ProductListResponse;
import com.sellphones.dto.product.response.ProductVariantResponse;

import java.util.List;

public interface ProductService {
    List<ProductListResponse> getAllProducts();
    List<ProductListResponse> getFeaturedProductsByCategory(Long categoryId);
    PageResponse<ProductListResponse> getProductByFilter(FilterRequest filter);
    ProductDetailsResponse getProductById(Long id);
    ProductVariantResponse getProductVariantById(Long id);
}
