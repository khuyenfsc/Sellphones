package com.sellphones.utils;

import com.sellphones.entity.order.Order;
import com.sellphones.dto.promotion.PromotionConditionDto;

public interface PromotionCondition {

    boolean isEligible(Order order, PromotionConditionDto cond);

}
