package com.sellphones.service.product.admin;

import com.sellphones.dto.product.admin.AdminStockEntryFilterRequest;
import com.sellphones.dto.product.admin.AdminStockEntryResponse;

import java.util.List;

public interface AdminStockEntryService {
    List<AdminStockEntryResponse> getStockEntries(AdminStockEntryFilterRequest request);

}
