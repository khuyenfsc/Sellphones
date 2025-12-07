package com.sellphones.repository.promotion;

import com.sellphones.entity.promotion.GiftProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface GiftProductRepository extends JpaRepository<GiftProduct, Long>, JpaSpecificationExecutor<GiftProduct> {
    List<GiftProduct> findByIdIn(Collection<Long> giftProductIds);

    @Modifying
    @Query("""
    UPDATE GiftProduct gf
    SET gf.stock = gf.stock - :qty
    WHERE gf.stock - :qty >= 0
      AND EXISTS (
          SELECT 1
          FROM gf.productVariants pv
          WHERE pv.id = :variantId
      )
    """)
    int deductStock(@Param("variantId") long variantId,
                    @Param("qty") long qty);
}
