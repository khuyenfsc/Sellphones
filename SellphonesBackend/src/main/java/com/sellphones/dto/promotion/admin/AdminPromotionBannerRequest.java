package com.sellphones.dto.promotion.admin;

import com.sellphones.entity.promotion.BannerStatus;
import com.sellphones.entity.promotion.BannerType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminPromotionBannerRequest {

    @NotBlank
    private String name;

    private String targetUrl;

//    @NotNull
//    private BannerType bannerType;

    @NotNull
    private BannerStatus status;

}
