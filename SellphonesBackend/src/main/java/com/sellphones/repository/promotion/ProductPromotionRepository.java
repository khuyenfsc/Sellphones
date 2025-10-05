package com.sellphones.repository.promotion;

import com.sellphones.entity.promotion.ProductPromotion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface ProductPromotionRepository extends JpaRepository<ProductPromotion, Long> {

    List<ProductPromotion> findByIdIn(Collection<Long> promotionIds);

}
