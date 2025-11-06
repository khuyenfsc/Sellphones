package com.sellphones.service.payment;

import com.sellphones.entity.order.Order;
import com.sellphones.entity.order.Payment;
import com.sellphones.entity.payment.PaymentMethod;
import com.sellphones.entity.payment.PaymentMethodType;
import com.sellphones.entity.payment.PaymentStatus;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.payment.PaymentMethodRepository;

import java.time.LocalDateTime;
import java.util.Map;

public interface PaymentService {
    PaymentMethodRepository getPaymentMethodRepository();

    default Payment initPayment(Long paymentMethodId) {
        PaymentMethod paymentMethod = getPaymentMethodRepository()
                .findById(paymentMethodId)
                .orElseThrow(() -> new AppException(ErrorCode.PAYMENT_METHOD_NOT_FOUND));

        return Payment.builder()
                .paymentMethod(paymentMethod)
                .status(PaymentStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();
    }

}
