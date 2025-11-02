package com.sellphones.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order_ProductVariantListResponse {

    private String productVariantName;

    private BigDecimal currentPrice;

    private String variantImage;


}
