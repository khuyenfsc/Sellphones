package com.sellphones.service.product.admin;

import com.sellphones.dto.address.AdminAddressFilterRequest;
import com.sellphones.dto.product.admin.AdminSupplierFilterRequest;
import com.sellphones.dto.product.admin.AdminSupplierRequest;
import com.sellphones.dto.product.admin.AdminSupplierResponse;

import java.util.List;

public interface AdminSupplierService {

    List<AdminSupplierResponse> getSuppliers(AdminSupplierFilterRequest request);
    void addSupplier(AdminSupplierRequest request);
    void editSupplier(AdminSupplierRequest request, Long id);
    void deleteSupplier(Long id);
}
