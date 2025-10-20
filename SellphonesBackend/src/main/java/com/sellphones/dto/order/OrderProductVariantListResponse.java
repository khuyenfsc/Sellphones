package com.sellphones.dto.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderProductVariantListResponse {

    private String productVariantName;

    private BigDecimal price;

    private String variantImage;


}
