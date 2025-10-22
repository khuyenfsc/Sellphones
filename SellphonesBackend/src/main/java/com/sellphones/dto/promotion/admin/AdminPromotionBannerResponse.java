package com.sellphones.dto.promotion.admin;

import com.sellphones.entity.promotion.BannerStatus;
import com.sellphones.entity.promotion.BannerType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminPromotionBannerResponse {

    private Long id;

    private String name;

    private String image;

    private String targetUrl;

    private BannerType bannerType;

    private BannerStatus status;

    private LocalDateTime createdAt;
}
