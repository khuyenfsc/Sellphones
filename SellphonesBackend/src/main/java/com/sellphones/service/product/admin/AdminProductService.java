package com.sellphones.service.product.admin;


import com.sellphones.dto.product.admin.AdminProductVariantFilterRequest;
import com.sellphones.dto.product.response.ProductListResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AdminProductService {
    void addProducts(String productJson, MultipartFile[] imageFiles, MultipartFile thumbnailFile);
    List<ProductListResponse> getProductVariants(AdminProductVariantFilterRequest request);
    void editProduct(String productJson, MultipartFile[] imageFiles, MultipartFile thumbnailFile, Long productId);
    void deleteProduct(Long productId);
}
