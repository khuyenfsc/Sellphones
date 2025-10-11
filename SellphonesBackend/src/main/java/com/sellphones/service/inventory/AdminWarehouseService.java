package com.sellphones.service.inventory;

import com.sellphones.dto.inventory.admin.AdminWarehouseFilterRequest;
import com.sellphones.dto.inventory.admin.AdminWarehouseRequest;
import com.sellphones.dto.inventory.admin.AdminWarehouseResponse;

import java.util.List;

public interface AdminWarehouseService {
    List<AdminWarehouseResponse> getWarehouses(AdminWarehouseFilterRequest request);
    void addWarehouse(AdminWarehouseRequest request);
    void editWarehouse(AdminWarehouseRequest request, Long id);
    void deleteWarehouse(Long id);
}
