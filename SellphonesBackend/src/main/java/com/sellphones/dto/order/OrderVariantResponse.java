package com.sellphones.dto.order;

import com.sellphones.dto.product.Order_ProductVariantResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class OrderVariantResponse {

    private Order_ProductVariantResponse productVariant;

    private Long quantity;

    private BigDecimal totalPrice;

}
