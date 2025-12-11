package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminReview_FilterRequest;
import com.sellphones.dto.product.admin.AdminUpdateReviewRequest;
import com.sellphones.dto.product.admin.AdminReviewResponse;
import com.sellphones.service.product.admin.AdminReviewService;
import jakarta.validation.Valid;
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
    public ResponseEntity<CommonResponse> getReviews(@Valid AdminReview_FilterRequest request){
        PageResponse<AdminReviewResponse> response = adminReviewService.getReviews(request);
        Map<String, Object> map = new HashMap<>();
        map.put("reviews", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CommonResponse> updateReview(@RequestBody AdminUpdateReviewRequest request, @PathVariable Long id){
        adminReviewService.updateReview(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated review successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete/{reviewId}")
    public ResponseEntity<CommonResponse> deleteReview(@PathVariable Long reviewId){
        adminReviewService.deleteReview(reviewId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted review successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

}
