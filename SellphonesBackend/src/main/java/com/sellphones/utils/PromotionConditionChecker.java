package com.sellphones.utils;

import com.sellphones.entity.order.Order;
import com.sellphones.entity.promotion.PaymentMethodCondition;
import com.sellphones.entity.promotion.Promotion;
import com.sellphones.entity.promotion.PromotionCondition;
import com.sellphones.entity.promotion.PromotionConditionDto;

import java.util.List;

public class PromotionConditionChecker {

    private static final List<PromotionCondition> conditions = List.of(
            new PaymentMethodCondition()
    );

    public static boolean isEligible(Order order, PromotionConditionDto cond){
        return conditions.stream().allMatch(c -> c.isEligible(order, cond));
    }

}
