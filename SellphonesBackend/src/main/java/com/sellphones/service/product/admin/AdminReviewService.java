package com.sellphones.service.product.admin;

import com.sellphones.dto.product.admin.AdminReviewFilterRequest;
import com.sellphones.dto.product.admin.AdminReviewRequest;
import com.sellphones.dto.product.admin.AdminReviewResponse;

import java.util.List;

public interface AdminReviewService {
    List<AdminReviewResponse> getReviews(AdminReviewFilterRequest request);
    void editReview(AdminReviewRequest request, Long reviewId);
    void deleteReview(Long reviewId);
}
