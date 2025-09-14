package com.sellphones.entity.promotion;

import com.sellphones.entity.order.OrderVariant;

public interface PromotionAction {
    void apply(OrderVariant orderVariant, String configJson);
}
