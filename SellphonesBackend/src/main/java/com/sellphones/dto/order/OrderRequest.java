package com.sellphones.dto.order;

import com.sellphones.dto.product.OrderProductRequest;
import com.sellphones.entity.payment.PaymentMethodType;
import com.sellphones.entity.payment.PaymentStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    @NotNull
    private List<OrderProductRequest> orderProducts;

    @NotNull
    private Long paymentMethodId;

//    private PaymentStatus paymentStatus;

    @NotNull
    private Long customerInfoId;

//    @NotNull
//    private PaymentMethodType paymentMethodType;
}
