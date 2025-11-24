package com.sellphones.repository.promotion;

import com.sellphones.entity.promotion.ProductPromotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface ProductPromotionRepository extends JpaRepository<ProductPromotion, Long>, JpaSpecificationExecutor<ProductPromotion> {

    List<ProductPromotion> findByIdIn(Collection<Long> promotionIds);

    @Query("""
        SELECT p FROM ProductPromotion p
        JOIN p.productVariants pv
        WHERE pv.id = :variantId
          AND p.startDate <= CURRENT_TIMESTAMP
          AND p.endDate >= CURRENT_TIMESTAMP
    """)
    List<ProductPromotion> findActivePromotions(@Param("variantId") Long variantId);

    @Query("""
        SELECT pv.id, p
        FROM ProductVariant pv
        JOIN pv.promotions p
        WHERE pv.id IN :variantIds
          AND p.startDate <= CURRENT_TIMESTAMP
          AND p.endDate >= CURRENT_TIMESTAMP
    """)
    List<Object[]> findActivePromotionsByVariantIds(@Param("variantIds") List<Long> variantIds);
}
