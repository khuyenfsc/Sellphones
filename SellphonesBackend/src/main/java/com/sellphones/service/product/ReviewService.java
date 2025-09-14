package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.response.ReviewResponse;

import java.util.List;

public interface ReviewService {
    PageResponse<ReviewResponse> getReviewsByConditions(Long productVariantId, Boolean hasPhotos, Integer ratingScore, Integer page, Integer size);
}
