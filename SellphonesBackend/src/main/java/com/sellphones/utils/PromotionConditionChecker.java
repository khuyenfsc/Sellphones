package com.sellphones.utils;

import com.sellphones.entity.order.Order;
import com.sellphones.dto.promotion.PromotionConditionDto;

import java.util.List;

public class PromotionConditionChecker {

    private static final List<PromotionCondition> conditions = List.of(
            new PaymentMethodCondition()
    );

    public static boolean  isEligible(Order order, PromotionConditionDto cond){
        return conditions.stream().allMatch(c -> c.isEligible(order, cond));
    }

}
