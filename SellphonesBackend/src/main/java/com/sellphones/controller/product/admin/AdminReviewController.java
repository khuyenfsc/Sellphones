package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminReviewFilterRequest;
import com.sellphones.dto.product.admin.AdminUpdateReviewRequest;
import com.sellphones.dto.product.admin.AdminReviewResponse;
import com.sellphones.service.product.admin.AdminReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/reviews")
public class AdminReviewController {

    private final AdminReviewService adminReviewService;

    @GetMapping
    public ResponseEntity<CommonResponse> getReviews(AdminReviewFilterRequest request){
        PageResponse<AdminReviewResponse> response = adminReviewService.getReviews(request);
        Map<String, Object> map = new HashMap<>();
        map.put("reviews", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/update-review/{reviewId}")
    public ResponseEntity<CommonResponse> editReviews(@RequestBody AdminUpdateReviewRequest request, @PathVariable Long reviewId){
        adminReviewService.editReview(request, reviewId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited review successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete-review/{reviewId}")
    public ResponseEntity<CommonResponse> deleteReview(@PathVariable Long reviewId){
        adminReviewService.deleteReview(reviewId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted review successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

}
