package com.sellphones.dto.order;

import com.sellphones.entity.order.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderListResponse {

    private String code;

    private List<OrderVariantListResponse> orderVariants;

    private LocalDateTime orderedAt;

    private OrderStatus orderStatus;

    private BigDecimal totalPrice;
}
