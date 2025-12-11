package com.sellphones.service.inventory;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.AdminWarehouse_FilterRequest;
import com.sellphones.dto.inventory.admin.AdminWarehouseRequest;
import com.sellphones.dto.inventory.admin.AdminWarehouseResponse;

public interface AdminWarehouseService {
    PageResponse<AdminWarehouseResponse> getWarehouses(AdminWarehouse_FilterRequest request);
    AdminWarehouseResponse getWarehouseById(Long id);
    void createWarehouse(AdminWarehouseRequest request);
    void updateWarehouse(AdminWarehouseRequest request, Long id);
    void deleteWarehouse(Long id);
}
