package com.sellphones.dto.inventory.admin;

import com.sellphones.dto.product.admin.AdminInventory_ProductVariantResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminInventoryResponse {

    private Long id;

    private AdminInventory_ProductVariantResponse productVariant;

    private AdminWarehouseResponse warehouse;

    private Long quantity;

    private LocalDateTime createdAt;
}
