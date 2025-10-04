package com.sellphones.dto.product.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductListResponse {

    private Long id;

    private String name;

    private String thumbnail;

    private BigDecimal minPrice;
}
