package com.sellphones.entity.promotion;

import com.sellphones.entity.order.Order;
import com.sellphones.entity.order.OrderVariant;
import com.sellphones.entity.payment.PaymentMethod;
import org.aspectj.weaver.ast.Or;

import java.util.List;

public class PaymentMethodCondition implements PromotionCondition{
    @Override
    public boolean isEligible(Order order, PromotionConditionDto cond) {
        if(cond.getPaymentMethodTypes() == null) return true;
        return cond.getPaymentMethodTypes().contains(order.getPaymentMethod().getPaymentMethodType());
    }
}
