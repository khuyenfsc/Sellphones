package com.sellphones.dto.inventory.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminStockEntry_InventoryResponse {
    private Long id;

    private AdminInventory_ProductVariantResponse productVariant;

    private AdminWarehouseResponse warehouse;
}
