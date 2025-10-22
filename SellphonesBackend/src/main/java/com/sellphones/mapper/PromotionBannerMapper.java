package com.sellphones.mapper;

import com.sellphones.dto.promotion.admin.AdminPromotionBannerRequest;
import com.sellphones.entity.promotion.PromotionBanner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class PromotionBannerMapper {
    public PromotionBanner mapToBannerEntity(AdminPromotionBannerRequest request, String imageName){
        PromotionBanner banner = PromotionBanner.builder()
                .name(request.getName())
                .targetUrl(request.getTargetUrl())
                .bannerType(request.getBannerType())
                .status(request.getStatus())
                .image(imageName)
                .createdAt(LocalDateTime.now())
                .build();

        return banner;
    }
}
