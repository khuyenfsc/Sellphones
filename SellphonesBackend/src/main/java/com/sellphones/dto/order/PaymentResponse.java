package com.sellphones.dto.order;

import com.sellphones.dto.payment.PaymentMethodResponse;
import com.sellphones.entity.payment.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class PaymentResponse {

    private PaymentMethodResponse paymentMethod;

    private PaymentStatus status;

}
