package com.sellphones.dto.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class OrderVariantListResponse {

    private OrderProductVariantListResponse productVariant;

    private Long quantity;

    private BigDecimal totalPrice;

}
