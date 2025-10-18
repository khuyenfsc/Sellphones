package com.sellphones.controller.promotion;

import com.sellphones.dto.promotion.PromotionBannerResponse;
import com.sellphones.service.promotion.PromotionBannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/promotion-banner")
@RequiredArgsConstructor
public class PromotionBannerController {

    private final PromotionBannerService promotionBannerService;

    @GetMapping("/all")
    public ResponseEntity<List<PromotionBannerResponse>> getAllPromotionBanners(){
        List<PromotionBannerResponse> response = promotionBannerService.getAllPromotionBanners();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
