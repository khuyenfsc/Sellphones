package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.RatingStatsResponse;
import com.sellphones.dto.product.ReviewFilterRequest;
import com.sellphones.dto.product.ReviewResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ReviewService {
    PageResponse<ReviewResponse> getReviewsByConditions(ReviewFilterRequest request);
    Map<Integer, Long> getRatingStatsByProductVariantId(Long id);
    ReviewResponse addReview(String reviewJson, MultipartFile[] files);
}
