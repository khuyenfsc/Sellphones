package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.request.ReviewRequest;
import com.sellphones.dto.product.response.ReviewResponse;
import com.sellphones.entity.user.Gender;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

public interface ReviewService {
    PageResponse<ReviewResponse> getReviewsByConditions(Long productVariantId, Boolean hasPhotos, Integer ratingScore, Integer page, Integer size);
    ReviewResponse addReview(String reviewJson, MultipartFile[] files);
}
