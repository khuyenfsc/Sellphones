package com.sellphones.entity.promotion;

import com.sellphones.entity.order.Order;


public class PaymentMethodCondition implements PromotionCondition{
    @Override
    public boolean isEligible(Order order, PromotionConditionDto cond) {
        if(cond.getPaymentMethodTypes() == null) return true;
        return cond.getPaymentMethodTypes().contains(order.getPayment().getPaymentMethod().getPaymentMethodType());
    }
}
