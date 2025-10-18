package com.sellphones.service.promotion;

import com.sellphones.entity.order.Order;
import com.sellphones.entity.order.OrderVariant;
import com.sellphones.entity.promotion.OrderVariantPromotion;
import com.sellphones.entity.promotion.ProductPromotion;
import com.sellphones.entity.promotion.Promotion;

import java.util.List;

public interface ProductPromotionService {
    void applyPromotions(OrderVariant orderVariant, List<OrderVariantPromotion> promotions, Order order);
}
