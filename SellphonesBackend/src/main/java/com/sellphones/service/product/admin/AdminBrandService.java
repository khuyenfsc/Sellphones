package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminBrandFilterRequest;
import com.sellphones.dto.product.admin.AdminBrandResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AdminBrandService {
    PageResponse<AdminBrandResponse> getBrands(AdminBrandFilterRequest request);
    void addBrand(String brandJson, MultipartFile file);
    void editBrand(String brandJson, MultipartFile file, Long id);
    void deleteBrand(Long id);
}
