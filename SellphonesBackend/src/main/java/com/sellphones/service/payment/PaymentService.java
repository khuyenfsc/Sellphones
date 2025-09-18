package com.sellphones.service.payment;

import com.sellphones.entity.payment.PaymentMethodType;

public interface PaymentService {
    void pay(PaymentMethodType paymentMethodType);
}
