package com.sellphones.service.inventory;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.AdminStockEntryFilterRequest;
import com.sellphones.dto.inventory.admin.AdminCreateStockEntryRequest;
import com.sellphones.dto.inventory.admin.AdminStockEntryResponse;
import com.sellphones.dto.inventory.admin.AdminUpdateStockEntryRequest;

public interface AdminStockEntryService {
    PageResponse<AdminStockEntryResponse> getStockEntriesBySupplierId(AdminStockEntryFilterRequest request, Long supplierId);
    PageResponse<AdminStockEntryResponse> getStockEntriesByInventoryId(AdminStockEntryFilterRequest request, Long supplierId);
    void addStockEntry(AdminCreateStockEntryRequest request, Long supplierId);
    void editStockEntry(AdminUpdateStockEntryRequest request, Long id);
    void deleteStockEntry(Long id);
}
