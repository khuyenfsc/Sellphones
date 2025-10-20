package com.sellphones.dto.product;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewFilterRequest {
    @NotNull
    private Long productVariantId;

    private Boolean hasPhotos;

    private Integer ratingScore;

    @Min(0)
    private Integer page = 0;

    @Min(1)
    @Max(100)
    private Integer size = 5;
}
