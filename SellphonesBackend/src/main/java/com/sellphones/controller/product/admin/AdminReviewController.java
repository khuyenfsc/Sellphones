package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminReviewFilterRequest;
import com.sellphones.dto.product.admin.AdminReviewRequest;
import com.sellphones.dto.product.admin.AdminReviewResponse;
import com.sellphones.service.product.admin.AdminReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
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
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/edit-review/{reviewId}")
    public ResponseEntity<CommonResponse> editReviews(@RequestBody AdminReviewRequest request, @PathVariable Long reviewId){
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
