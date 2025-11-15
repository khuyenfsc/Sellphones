package com.sellphones.dto.product.admin;

import com.sellphones.entity.product.ProductStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminProductVariantFilterRequest {

    private String keyword;

    private ProductStatus status;

    @NotBlank
    private String sortType;

    @Min(0)
    private BigDecimal minPrice;

    @Min(0)
    private BigDecimal maxPrice;

    @Min(0)
    private Integer page = 0;

    @Max(100)
    @Min(1)
    private Integer size = 5;

}
