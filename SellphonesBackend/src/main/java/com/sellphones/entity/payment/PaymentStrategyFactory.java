//package com.sellphones.entity.payment;
//
//import org.springframework.stereotype.Service;
//
//import java.util.Map;
//
//@Service
//public class PaymentStrategyFactory {
//
//    private final static Map<PaymentMethodType, PaymentStrategy> paymentStrategies = Map.ofEntries(
//            Map.entry(PaymentMethodType.CASH, new CashPaymentStrategy()),
//            Map.entry(PaymentMethodType.VNPAY, new VNPayPaymentStrategy())
//    );
//
//    public static PaymentStrategy getPaymentStrategy(PaymentMethodType paymentMethodType){
//        return paymentStrategies.get(paymentMethodType);
//    }
//
//}
