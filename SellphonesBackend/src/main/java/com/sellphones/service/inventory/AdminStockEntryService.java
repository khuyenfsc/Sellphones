package com.sellphones.service.inventory;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.AdminStockEntryFilterRequest;
import com.sellphones.dto.inventory.admin.AdminStockEntryRequest;
import com.sellphones.dto.inventory.admin.AdminStockEntryResponse;

import java.util.List;

public interface AdminStockEntryService {
    PageResponse<AdminStockEntryResponse> getStockEntriesBySupplierId(AdminStockEntryFilterRequest request, Long supplierId);
    PageResponse<AdminStockEntryResponse> getStockEntriesByInventoryId(AdminStockEntryFilterRequest request, Long supplierId);
    void addStockEntry(AdminStockEntryRequest request, Long supplierId);
    void editStockEntry(AdminStockEntryRequest request, Long id);
    void deleteStockEntry(Long id);
}
