package com.sellphones.controller.promotion;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.promotion.PromotionBannerResponse;
import com.sellphones.service.promotion.PromotionBannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/promotion-banners")
@RequiredArgsConstructor
public class PromotionBannerController {

    private final PromotionBannerService promotionBannerService;

    @GetMapping
    public ResponseEntity<CommonResponse> getAllPromotionBanners(){
        List<PromotionBannerResponse> response = promotionBannerService.getAllPromotionBanners();
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

}
