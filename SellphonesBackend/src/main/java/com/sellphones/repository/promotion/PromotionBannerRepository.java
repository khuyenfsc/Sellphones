package com.sellphones.repository.promotion;

import com.sellphones.entity.promotion.BannerStatus;
import com.sellphones.entity.promotion.PromotionBanner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface PromotionBannerRepository extends JpaRepository<PromotionBanner, Long>, JpaSpecificationExecutor<PromotionBanner> {
    List<PromotionBanner> findByStatusOrderByIdAsc(BannerStatus status);
}
