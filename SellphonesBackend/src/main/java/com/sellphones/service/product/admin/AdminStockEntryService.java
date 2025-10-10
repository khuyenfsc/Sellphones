package com.sellphones.service.product.admin;

import com.sellphones.dto.product.admin.AdminStockEntryFilterRequest;
import com.sellphones.dto.product.admin.AdminStockEntryRequest;
import com.sellphones.dto.product.admin.AdminStockEntryResponse;

import java.util.List;

public interface AdminStockEntryService {
    List<AdminStockEntryResponse> getStockEntries(AdminStockEntryFilterRequest request);
    void addStockEntry(AdminStockEntryRequest request);
    void editStockEntry(AdminStockEntryRequest request, Long id);
    void deleteStockEntry(Long id);
}
