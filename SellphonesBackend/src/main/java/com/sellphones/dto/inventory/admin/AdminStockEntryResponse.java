package com.sellphones.dto.inventory.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminStockEntryResponse {

    private Long id;

    private AdminStockEntry_InventoryResponse inventory;

    private Long quantity;

    private BigDecimal purchasePrice;

    private LocalDate importDate;

//    private AdminStockEntry_SupplierResponse supplier;

//    private AdminWarehouseResponse warehouse;
}
