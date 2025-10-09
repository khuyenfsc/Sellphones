package com.sellphones.dto.product.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminStockEntryResponse {

    private AdminStockEntry_ProductVariantResponse productVariant;

    private Long quantity;

    private BigDecimal purchasePrice;

    private LocalDate importDate;

    private AdminStockEntry_SupplierResponse supplier;
}
