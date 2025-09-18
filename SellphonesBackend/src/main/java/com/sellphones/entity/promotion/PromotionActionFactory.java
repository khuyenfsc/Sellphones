package com.sellphones.entity.promotion;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PromotionActionFactory {

    private final DiscountValueAction discountValueAction;
    private final DiscountPercentAction discountPercentAction;
    private final ServiceAction serviceAction;

    public PromotionAction getAction(PromotionType type){
        return switch (type){
            case DISCOUNT_AMOUNT -> discountValueAction;
            case DISCOUNT_PERCENT -> discountPercentAction;
            case SERVICE -> serviceAction;
        };
    }

}
