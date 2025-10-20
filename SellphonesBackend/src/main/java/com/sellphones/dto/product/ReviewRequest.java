package com.sellphones.dto.product;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequest {

    private Long productVariantId;

    @Max(5)
    @Min(1)
    private Integer ratingScore;

    private String content;

}
