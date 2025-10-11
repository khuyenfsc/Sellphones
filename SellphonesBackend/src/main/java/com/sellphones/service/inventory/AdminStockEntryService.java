package com.sellphones.service.inventory;

import com.sellphones.dto.inventory.admin.AdminStockEntryFilterRequest;
import com.sellphones.dto.inventory.admin.AdminStockEntryRequest;
import com.sellphones.dto.inventory.admin.AdminStockEntryResponse;

import java.util.List;

public interface AdminStockEntryService {
    List<AdminStockEntryResponse> getStockEntries(AdminStockEntryFilterRequest request);
    void addStockEntry(AdminStockEntryRequest request);
    void editStockEntry(AdminStockEntryRequest request, Long id);
    void deleteStockEntry(Long id);
}
