package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminWarrantyFilterRequest;
import com.sellphones.dto.product.admin.AdminWarrantyRequest;
import com.sellphones.dto.product.admin.AdminWarrantyResponse;

import java.util.List;

public interface AdminWarrantyService {
    PageResponse<AdminWarrantyResponse> getWarranties(AdminWarrantyFilterRequest request);
    void addWarranty(AdminWarrantyRequest request);
    void editWarranty(AdminWarrantyRequest request, Long id);
    void deleteWarranty(Long id);
}
