package com.sellphones.controller.product;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.request.ReviewRequest;
import com.sellphones.dto.product.response.ReviewResponse;
import com.sellphones.entity.product.Review;
import com.sellphones.entity.user.Gender;
import com.sellphones.service.product.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
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

    @PostMapping("/add-review")
    public ResponseEntity<CommonResponse> addReview(
            @RequestPart ("review")String reviewJson,
            @RequestPart(name = "files", required = false) MultipartFile[] files
    ){
        ReviewResponse review = reviewService.addReview(reviewJson, files);
        Map<String, Object> map = new HashMap<>();
        map.put("result", review);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
