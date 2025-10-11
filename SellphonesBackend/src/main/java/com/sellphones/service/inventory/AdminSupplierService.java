package com.sellphones.service.inventory;

import com.sellphones.dto.inventory.admin.AdminSupplierFilterRequest;
import com.sellphones.dto.inventory.admin.AdminSupplierRequest;
import com.sellphones.dto.inventory.admin.AdminSupplierResponse;

import java.util.List;

public interface AdminSupplierService {

    List<AdminSupplierResponse> getSuppliers(AdminSupplierFilterRequest request);
    void addSupplier(AdminSupplierRequest request);
    void editSupplier(AdminSupplierRequest request, Long id);
    void deleteSupplier(Long id);
}
