package com.sellphones.dto.inventory.admin;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminInventoryRequest {
    @NotNull
    private Long productVariantId;

    @NotNull
    private Long warehouseId;
}
