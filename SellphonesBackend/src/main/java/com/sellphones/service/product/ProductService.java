package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.*;

import java.util.List;

public interface ProductService {
    List<ProductListResponse> getAllProducts();
    List<ProductListResponse> getFeaturedProductsByCategory(String categoryName);
    PageResponse<ProductListResponse> getProductByFilter(FilterRequest filter);
    ProductDetailsResponse getProductById(Long id);
    ProductVariantResponse getProductVariantById(Long id);
    List<ProductDocumentResponse> getSuggestedProducts(String keyword);
    List<ProductListResponse> getSimilarProducts(Long productId);
    PageResponse<ProductListResponse> searchProductsByKeyword(String keyword, Integer page, String sortType);
}
