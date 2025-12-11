package com.sellphones.service.inventory;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.AdminStockEntry_FilterRequest;
import com.sellphones.dto.inventory.admin.AdminCreateStockEntryRequest;
import com.sellphones.dto.inventory.admin.AdminStockEntryResponse;
import com.sellphones.dto.inventory.admin.AdminUpdateStockEntryRequest;

public interface AdminStockEntryService {
    PageResponse<AdminStockEntryResponse> getStockEntriesBySupplierId(AdminStockEntry_FilterRequest request, Long supplierId);
    PageResponse<AdminStockEntryResponse> getStockEntriesByInventoryId(AdminStockEntry_FilterRequest request, Long supplierId);
    void createStockEntry(AdminCreateStockEntryRequest request, Long supplierId);
    void updateStockEntry(AdminUpdateStockEntryRequest request, Long id);
    void deleteStockEntry(Long id);
}
