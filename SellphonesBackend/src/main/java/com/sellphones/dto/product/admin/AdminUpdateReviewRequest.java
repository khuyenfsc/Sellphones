package com.sellphones.dto.product.admin;

import com.sellphones.entity.product.ReviewStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUpdateReviewRequest {
    @NotNull
    private ReviewStatus status;
}
