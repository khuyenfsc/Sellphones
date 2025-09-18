package com.sellphones.dto.order;

import com.sellphones.dto.customer.CustomerInfoResponse;
import com.sellphones.dto.payment.PaymentMethodResponse;
import com.sellphones.entity.customer.CustomerInfo;
import com.sellphones.entity.order.OrderStatus;
import com.sellphones.entity.payment.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailResponse {

    private String code;

    private List<OrderProductVariantDetailsResponse> orderVariants;

    private LocalDateTime orderedAt;

    private BigDecimal totalPrice;

    private OrderStatus orderStatus;

    private PaymentMethodResponse paymentMethod;

    private PaymentStatus paymentStatus;

    private CustomerInfoResponse customerInfo;

}
