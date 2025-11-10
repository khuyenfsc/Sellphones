package com.sellphones.dto.order.admin;

import com.sellphones.dto.customer.CustomerInfoResponse;
import com.sellphones.dto.order.OrderVariantListResponse;
import com.sellphones.dto.order.PaymentResponse;
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
public class AdminOrderListResponse {

    private Long id;

    private String code;

    private LocalDateTime orderedAt;

    private OrderStatus orderStatus;

    private BigDecimal totalPrice;

    private PaymentResponse payment;

    private String createBy;

    private CustomerInfoResponse customer;
}
