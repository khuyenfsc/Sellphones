package com.sellphones.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThumbnailProductResponse {
    private BigDecimal rootPrice;

    private BigDecimal currentPrice;
}
