package com.sellphones.dto.inventory.admin;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUpdateStockEntryRequest {
    private Long quantity;

    @NotNull
    private BigDecimal purchasePrice;
}
