package com.sellphones.service.promotion;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.entity.order.Order;
import com.sellphones.entity.order.OrderVariant;
import com.sellphones.entity.promotion.*;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.utils.PromotionConditionChecker;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductPromotionServiceImpl implements ProductPromotionService {

    private final ObjectMapper objectMapper;

    private final PromotionActionFactory promotionActionFactory;

    @Override
    public void applyPromotions(OrderVariant orderVariant, List<OrderVariantPromotion> promotions, Order order) {
        for(Promotion promotion : promotions){
            try{

                PromotionConditionDto promotionConditionDto = objectMapper.readValue(promotion.getCondition(), PromotionConditionDto.class);
                if(PromotionConditionChecker.isEligible(order, promotionConditionDto)){
                    PromotionAction promotionAction = promotionActionFactory.getAction(promotion.getType());
                    promotionAction.apply(orderVariant, promotion.getConfig());
                }
            }catch (JsonProcessingException e){
                throw new AppException(ErrorCode.INVALID_PROMOTION_CONFIG);
            }
        }
    }
}
