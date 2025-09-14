package com.sellphones.controller.product;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.response.ReviewResponse;
import com.sellphones.service.product.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<CommonResponse> getReviewsByConditions(
            @RequestParam("product_variant_id") Long productVariantId,
            @RequestParam(value = "hasPhotos", required = false) Boolean hasPhotos,
            @RequestParam(value = "rating_score", required = false) Integer ratingScore,
            @RequestParam(value = "page") Integer page,
            @RequestParam("size") Integer size
    ){
        PageResponse<ReviewResponse> reviews = reviewService.getReviewsByConditions(productVariantId, hasPhotos, ratingScore, page, size);
        Map<String, Object> map = new HashMap<>();
        map.put("reviews", reviews);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
