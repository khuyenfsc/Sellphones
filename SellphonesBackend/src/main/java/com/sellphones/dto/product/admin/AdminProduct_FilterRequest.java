package com.sellphones.dto.product.admin;

import com.sellphones.entity.product.ProductStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminProduct_FilterRequest {

    private String keyword;

    private BigDecimal minPrice;

    private BigDecimal maxPrice;

    private String categoryName;

    private String brandName;

    private ProductStatus status;

    @Min(1)
    @Max(5)
    private Integer minStar;

    @Min(1)
    @Max(5)
    private Integer maxStar;

    private Boolean isNew;

    private Boolean isFeatured;

    @Min(0)
    private Integer page = 0;

    @Min(1)
    private Integer size = 10;

    private String sortType;
}
