package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminBrand_FilterRequest;
import com.sellphones.dto.product.admin.AdminBrandResponse;
import org.springframework.web.multipart.MultipartFile;

public interface AdminBrandService {
    PageResponse<AdminBrandResponse> getBrands(AdminBrand_FilterRequest request);
    void createBrand(String brandJson, MultipartFile file);
    void updateBrand(String brandJson, MultipartFile file, Long id);
    void deleteBrand(Long id);
}
