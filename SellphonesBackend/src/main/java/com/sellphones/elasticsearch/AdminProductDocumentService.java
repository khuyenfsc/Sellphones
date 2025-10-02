package com.sellphones.elasticsearch;

import com.sellphones.dto.product.admin.AdminProductFilterRequest;
import com.sellphones.dto.product.response.ProductListResponse;

import java.util.List;

public interface AdminProductDocumentService {
    List<ProductListResponse> getProducts(AdminProductFilterRequest request);
}
