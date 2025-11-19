package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminReviewFilterRequest;
import com.sellphones.dto.product.admin.AdminUpdateReviewRequest;
import com.sellphones.dto.product.admin.AdminReviewResponse;

public interface AdminReviewService {
    PageResponse<AdminReviewResponse> getReviews(AdminReviewFilterRequest request);
    void editReview(AdminUpdateReviewRequest request, Long reviewId);
    void deleteReview(Long reviewId);
}
