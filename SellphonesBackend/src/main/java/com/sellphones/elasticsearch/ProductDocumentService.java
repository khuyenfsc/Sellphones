package com.sellphones.elasticsearch;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.response.ProductDocumentResponse;
import com.sellphones.dto.product.response.ProductListResponse;

import java.util.List;

public interface ProductDocumentService {

    List<ProductDocumentResponse> getSuggestedProducts(String keyword);
    PageResponse<ProductListResponse> searchProductsByKeyword(String keyword, Integer page, String sortType);

}
