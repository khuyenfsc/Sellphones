package com.sellphones.dto.order;

import com.sellphones.dto.product.Order_ProductVariantListResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class OrderVariantListResponse {

    private Order_ProductVariantListResponse productVariant;

    private Long quantity;

    private BigDecimal totalPrice;

}
