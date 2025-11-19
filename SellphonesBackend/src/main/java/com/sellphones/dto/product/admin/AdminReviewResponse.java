package com.sellphones.dto.product.admin;

import com.sellphones.dto.user.admin.AdminReview_UserResponse;
import com.sellphones.entity.product.ReviewStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminReviewResponse {

    private Long id;

    private AdminReview_UserResponse user;

    private String content;

    private int ratingScore;

    private ReviewStatus status;

    private AdminReviewVariantResponse productVariant;

    private List<String> imageNames = new ArrayList<>();

    private LocalDateTime createdAt;
}
