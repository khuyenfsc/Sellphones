package com.sellphones.entity.promotion;

import com.sellphones.entity.order.Order;
import com.sellphones.entity.order.OrderVariant;

public interface PromotionCondition {

    boolean isEligible(Order order, PromotionConditionDto cond);

}
