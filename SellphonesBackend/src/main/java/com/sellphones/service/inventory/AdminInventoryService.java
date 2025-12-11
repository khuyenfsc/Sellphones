package com.sellphones.service.inventory;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.AdminInventory_FilterRequest;
import com.sellphones.dto.inventory.admin.AdminInventoryRequest;
import com.sellphones.dto.inventory.admin.AdminInventoryResponse;

public interface AdminInventoryService {
    PageResponse<AdminInventoryResponse> getInventories(AdminInventory_FilterRequest request);
    PageResponse<AdminInventoryResponse> getInventories(AdminInventory_FilterRequest request, Long warehouseId);
    AdminInventoryResponse getInventoryById(Long id);
    void createInventory(AdminInventoryRequest request, Long warehouseId);
    void updateInventory(AdminInventoryRequest request, Long id);
    void deleteInventory(Long id);
}
