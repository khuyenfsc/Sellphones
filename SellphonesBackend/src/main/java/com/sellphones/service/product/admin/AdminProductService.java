package com.sellphones.service.product.admin;


import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminProductDetailResponse;
import com.sellphones.dto.product.admin.AdminProductVariantFilterRequest;
import com.sellphones.dto.product.admin.AdminProductVariantListResponse;
import com.sellphones.dto.product.response.ProductVariantResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AdminProductService {
    AdminProductDetailResponse getProductDetails(Long productId);
    void addProduct(String productJson, MultipartFile[] imageFiles, MultipartFile thumbnailFile);
    void editProduct(String productJson, MultipartFile[] imageFiles, MultipartFile thumbnailFile, Long productId);
    void deleteProduct(Long productId);
    PageResponse<AdminProductVariantListResponse> getProductVariants(AdminProductVariantFilterRequest request, Long productId);
    ProductVariantResponse getProductVariantDetail(Long productVariantId);
    void addProductVariant(String productVariantJson, MultipartFile file, Long productId);
    void editProductVariant(String productVariantJson, MultipartFile file, Long productVariantId);
    void deleteProductVariant(Long productVariantId);
}
