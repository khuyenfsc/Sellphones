package com.sellphones.service.product.admin;


import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.ProductResponse;
import com.sellphones.dto.product.admin.AdminProductDetailsResponse;
import com.sellphones.dto.product.admin.AdminProductVariant_FilterRequest;
import com.sellphones.dto.product.admin.AdminProductVariantResponse;
import com.sellphones.dto.product.ProductVariantResponse;
import com.sellphones.dto.product.admin.AdminProduct_FilterRequest;
import org.springframework.web.multipart.MultipartFile;

public interface AdminProductService {
    PageResponse<ProductResponse> getProducts(AdminProduct_FilterRequest request);
    AdminProductDetailsResponse getProductById(Long productId);
    void createProduct(String productJson, MultipartFile[] imageFiles, MultipartFile thumbnailFile);
    void updateProduct(String productJson, MultipartFile[] imageFiles, MultipartFile thumbnailFile, Long id);
    void deleteProduct(Long productId);
    PageResponse<AdminProductVariantResponse> getProductVariants(AdminProductVariant_FilterRequest request, Long productId);
    void setThumbnail(Long productId, Long id);
    ProductVariantResponse getVariantById(Long id);
    void createVariant(String productVariantJson, MultipartFile imageFile, Long productId);
    void updateVariant(String productVariantJson, MultipartFile file, Long productVariantId);
    void deleteVariant(Long productVariantId);
}
