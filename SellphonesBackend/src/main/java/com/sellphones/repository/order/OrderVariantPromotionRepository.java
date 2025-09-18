package com.sellphones.repository.order;

import com.sellphones.entity.promotion.OrderVariantPromotion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderVariantPromotionRepository extends JpaRepository<OrderVariantPromotion, Long> {
}
