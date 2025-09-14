package com.sellphones.entity.promotion;

public class PromotionActionFactory {

    public PromotionAction getAction(PromotionType type){
        return switch (type){
            case DISCOUNT_AMOUNT -> new DiscountValueAction();
            case DISCOUNT_PERCENT -> new DiscountPercentAction();
            case VOUCHER -> new VoucherAction();
            case SERVICE -> new ServiceAction();
        };
    }

}
