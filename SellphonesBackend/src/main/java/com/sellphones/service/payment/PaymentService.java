package com.sellphones.service.payment;

import com.sellphones.entity.order.Order;
import com.sellphones.entity.payment.PaymentMethodType;

public interface PaymentService {
    void pay(Order order);
    void refund(Order order);
}
