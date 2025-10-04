package com.sellphones.dto.product.admin;

import com.sellphones.entity.product.ProductVariantStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminProductVariantFilterRequest {

    private String keyword;

    private Long price;

    private String skuKeyword;

    private ProductVariantStatus status;

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
