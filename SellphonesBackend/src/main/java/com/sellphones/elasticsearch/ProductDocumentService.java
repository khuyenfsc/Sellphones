package com.sellphones.elasticsearch;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.ProductDocumentResponse;
import com.sellphones.dto.product.ProductResponse;

import java.util.List;

public interface ProductDocumentService {

    List<ProductDocumentResponse> getSuggestedProducts(String keyword);
    List<ProductResponse> getSimilarProducts(Long productId);
    PageResponse<ProductResponse> searchProductsByKeyword(String keyword, Integer page, String sortType);

}
