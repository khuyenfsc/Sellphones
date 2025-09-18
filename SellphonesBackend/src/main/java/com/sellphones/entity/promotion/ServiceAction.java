package com.sellphones.entity.promotion;

import com.sellphones.entity.order.OrderVariant;
import org.springframework.stereotype.Component;

@Component
public class ServiceAction implements PromotionAction{
    @Override
    public void apply(OrderVariant orderVariant, String configJson) {

    }
}
