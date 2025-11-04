package com.sellphones.controller.product;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.RatingStatsResponse;
import com.sellphones.dto.product.ReviewFilterRequest;
import com.sellphones.dto.product.ReviewResponse;
import com.sellphones.entity.product.RatingStats;
import com.sellphones.service.product.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<CommonResponse> getReviewsByConditions(ReviewFilterRequest request){
        PageResponse<ReviewResponse> reviews = reviewService.getReviewsByConditions(request);
        Map<String, Object> map = new HashMap<>();
        map.put("reviews", reviews);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/product-variants/{variantId}/rating-stats")
    public ResponseEntity<CommonResponse> getRatingStatsByProductVariantId(@PathVariable Long variantId){
        Map<Integer, Long> response = reviewService.getRatingStatsByProductVariantId(variantId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/add-review")
    public ResponseEntity<CommonResponse> addReview(
            @RequestPart ("review")String reviewJson,
            @RequestPart(name = "files", required = false) MultipartFile[] files
    ){
        ReviewResponse review = reviewService.addReview(reviewJson, files);
        Map<String, Object> map = new HashMap<>();
        map.put("result", review);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

}
