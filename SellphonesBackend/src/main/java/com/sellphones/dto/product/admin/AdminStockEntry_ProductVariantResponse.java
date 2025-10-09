package com.sellphones.dto.product.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminStockEntry_ProductVariantResponse {
    private Long id;

    private String productVariantName;
}
