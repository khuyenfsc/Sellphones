package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminReview_FilterRequest;
import com.sellphones.dto.product.admin.AdminUpdateReviewRequest;
import com.sellphones.dto.product.admin.AdminReviewResponse;

public interface AdminReviewService {
    PageResponse<AdminReviewResponse> getReviews(AdminReview_FilterRequest request);
    void updateReview(AdminUpdateReviewRequest request, Long reviewId);
    void deleteReview(Long reviewId);
}
