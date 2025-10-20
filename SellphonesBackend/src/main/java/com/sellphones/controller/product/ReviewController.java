package com.sellphones.controller.product;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.ReviewFilterRequest;
import com.sellphones.dto.product.ReviewResponse;
import com.sellphones.service.product.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
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
