package com.sellphones.dto.promotion;

import com.sellphones.entity.promotion.BannerType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PromotionBannerResponse {

    private String name;

    private String imgUrl;

    private String targetUrl;

    private BannerType bannerType;

    private Integer position;

}
