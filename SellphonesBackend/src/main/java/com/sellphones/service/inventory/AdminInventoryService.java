package com.sellphones.service.inventory;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.AdminInventoryFilterRequest;
import com.sellphones.dto.inventory.admin.AdminInventoryRequest;
import com.sellphones.dto.inventory.admin.AdminInventoryResponse;

import java.util.List;

public interface AdminInventoryService {
    PageResponse<AdminInventoryResponse> getInventories(AdminInventoryFilterRequest request);
    PageResponse<AdminInventoryResponse> getInventories(AdminInventoryFilterRequest request, Long warehouseId);
    AdminInventoryResponse getInventoryById(Long id);
    void addInventory(AdminInventoryRequest request, Long warehouseId);
    void editInventory(AdminInventoryRequest request, Long id);
    void deleteInventory(Long id);
}
