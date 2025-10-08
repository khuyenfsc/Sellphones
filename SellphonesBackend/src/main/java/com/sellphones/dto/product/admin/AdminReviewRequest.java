package com.sellphones.dto.product.admin;

import com.sellphones.entity.product.ReviewStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminReviewRequest {
    private ReviewStatus status;
}
