package com.sellphones.dto.inventory.admin;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminInventoryFilterRequest {

    private String productVariantName;

    private String sortType;

    private Long minStock;

    private Long maxStock;

    @Min(0)
    private Integer page = 0;

    @Min(1)
    private Integer size = 5;
}
