package com.sellphones.repository.promotion;

import com.sellphones.entity.promotion.GiftProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface GiftProductRepository extends JpaRepository<GiftProduct, Long> {
    List<GiftProduct> findByIdIn(Collection<Long> giftProductIds);
}
