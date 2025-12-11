package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminWarranty_FilterRequest;
import com.sellphones.dto.product.admin.AdminWarrantyRequest;
import com.sellphones.dto.product.admin.AdminWarrantyResponse;

public interface AdminWarrantyService {
    PageResponse<AdminWarrantyResponse> getWarranties(AdminWarranty_FilterRequest request);
    void createWarranty(AdminWarrantyRequest request);
    void updateWarranty(AdminWarrantyRequest request, Long id);
    void deleteWarranty(Long id);
}
