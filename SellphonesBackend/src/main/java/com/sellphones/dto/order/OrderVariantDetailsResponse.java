package com.sellphones.dto.order;

import com.sellphones.dto.product.WarrantyResponse;
import com.sellphones.dto.promotion.OrderVariantPromotionResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class OrderVariantDetailsResponse {

    private OrderProductVariantDetailsResponse productVariant;

    private Long quantity;

    private BigDecimal totalPrice;

    private WarrantyResponse warranty;

    private List<OrderVariantPromotionResponse> promotions;
}
