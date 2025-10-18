package com.sellphones.service.inventory;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.AdminInventoryFilterRequest;
import com.sellphones.dto.inventory.admin.AdminInventoryRequest;
import com.sellphones.dto.inventory.admin.AdminInventoryResponse;

import java.util.List;

public interface AdminInventoryService {
    PageResponse<AdminInventoryResponse> getInventories(AdminInventoryFilterRequest request);
    void addInventory(AdminInventoryRequest request);
    void editInventory(AdminInventoryRequest request, Long id);
    void deleteInventory(Long id);
}
