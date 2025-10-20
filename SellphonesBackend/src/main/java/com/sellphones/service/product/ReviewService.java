package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.ReviewFilterRequest;
import com.sellphones.dto.product.ReviewResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ReviewService {
    PageResponse<ReviewResponse> getReviewsByConditions(ReviewFilterRequest request);
    ReviewResponse addReview(String reviewJson, MultipartFile[] files);
}
