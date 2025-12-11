package com.sellphones.utils;

import com.sellphones.entity.order.Order;
import com.sellphones.dto.promotion.PromotionConditionDto;


public class PaymentMethodCondition implements PromotionCondition{
    @Override
    public boolean isEligible(Order order, PromotionConditionDto cond) {
        if(cond.getPaymentMethodTypes() == null || cond.getPaymentMethodTypes().isEmpty()) return true;
        return cond.getPaymentMethodTypes().contains(order.getPayment().getPaymentMethod().getPaymentMethodType());
    }
}
