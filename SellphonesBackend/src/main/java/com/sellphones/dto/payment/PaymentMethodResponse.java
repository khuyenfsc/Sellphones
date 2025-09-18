package com.sellphones.dto.payment;

import com.sellphones.entity.payment.PaymentMethodType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentMethodResponse {

    private String name;

    private PaymentMethodType paymentMethodType;

}
