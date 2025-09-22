package com.sellphones.service.payment;

import com.sellphones.entity.order.Order;
import com.sellphones.entity.payment.PaymentMethodType;
import com.sellphones.entity.payment.PaymentStrategy;
import com.sellphones.entity.payment.PaymentStrategyFactory;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService{
    @Override
    public void pay(PaymentMethodType paymentMethodType) {
        PaymentStrategy paymentStrategy = PaymentStrategyFactory.getPaymentStrategy(paymentMethodType);
        if(paymentStrategy == null){
            throw new AppException(ErrorCode.PAYMENT_METHOD_TYPE_NOT_FOUND);
        }
        paymentStrategy.pay();
    }

    @Override
    public void refund(Order order) {

    }
}
