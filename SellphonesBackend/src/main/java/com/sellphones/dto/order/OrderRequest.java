package com.sellphones.dto.order;

import com.sellphones.dto.product.OrderProductRequest;
import com.sellphones.entity.payment.PaymentMethodType;
import com.sellphones.entity.payment.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    private List<OrderProductRequest> orderProducts;

    private Long paymentMethodId;

    private PaymentStatus paymentStatus;

    private Long customerInfoId;

    private PaymentMethodType paymentMethodType;
}
