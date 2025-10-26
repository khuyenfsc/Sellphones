package com.sellphones.elasticsearch;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.ProductDocumentResponse;
import com.sellphones.dto.product.ProductListResponse;

import java.util.List;

public interface ProductDocumentService {

    List<ProductDocumentResponse> getSuggestedProducts(String keyword);
    List<ProductListResponse> getSimilarProducts(Long productId);
    PageResponse<ProductListResponse> searchProductsByKeyword(String keyword, Integer page, String sortType);

}
