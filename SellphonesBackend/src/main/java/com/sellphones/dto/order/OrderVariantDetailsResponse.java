package com.sellphones.dto.order;

import com.sellphones.dto.product.Order_ProductVariantDetailsResponse;
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

    private Order_ProductVariantDetailsResponse productVariant;

    private Long quantity;

    private BigDecimal totalPrice;

    private BigDecimal discountAmount;

    private WarrantyResponse warranty;

    private List<OrderVariantPromotionResponse> promotions;
}
