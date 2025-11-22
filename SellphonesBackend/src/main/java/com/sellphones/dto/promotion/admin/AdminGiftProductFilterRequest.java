package com.sellphones.dto.promotion.admin;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminGiftProductFilterRequest {

    private String name;

    private String sortType;

    @Min(0)
    private Long maxStock;

    @Min(0)
    private Long minStock;

    @Min(0)
    private Long minPrice;

    @Min(0)
    private Long maxPrice;

    @Min(0)
    private Integer page = 0;

    @Max(100)
    @Min(1)
    private Integer size = 5;

}
