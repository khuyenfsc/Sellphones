package com.sellphones.service.inventory;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.AdminSupplier_FilterRequest;
import com.sellphones.dto.inventory.admin.AdminSupplierRequest;
import com.sellphones.dto.inventory.admin.AdminSupplierResponse;

public interface AdminSupplierService {
    AdminSupplierResponse getSupplierById(Long id);
    PageResponse<AdminSupplierResponse> getSuppliers(AdminSupplier_FilterRequest request);
    void createSupplier(AdminSupplierRequest request);
    void updateSupplier(AdminSupplierRequest request, Long id);
    void deleteSupplier(Long id);
}
