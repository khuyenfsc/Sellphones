package com.sellphones.dto.product.request.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PriceRequest {
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
}
