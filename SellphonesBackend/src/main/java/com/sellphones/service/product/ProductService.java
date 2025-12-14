package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.*;

import java.util.List;

public interface ProductService {
    List<ProductResponse> getAllProducts();
    List<ProductResponse> getFeaturedProductsByCategory(String categoryName);
    PageResponse<ProductResponse> getProductByFilter(FilterRequest filter);
    ProductDetailsResponse getProductById(Long id);
    ProductVariantResponse getProductVariantById(Long id);
    List<ProductDocumentResponse> getSuggestedProducts(String keyword);
    List<ProductResponse> getSimilarProducts(Long productId);
    PageResponse<ProductResponse> searchProductsByKeyword(String keyword, Integer page, Integer size, String sortType);
}
