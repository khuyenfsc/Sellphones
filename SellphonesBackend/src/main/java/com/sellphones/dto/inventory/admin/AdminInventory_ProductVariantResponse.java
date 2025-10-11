package com.sellphones.dto.inventory.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminInventory_ProductVariantResponse {
    private Long id;

    private String productVariantName;
}
