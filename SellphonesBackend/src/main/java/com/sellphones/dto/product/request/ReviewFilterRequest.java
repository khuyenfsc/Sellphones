package com.sellphones.dto.product.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sellphones.entity.product.ReviewStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.RequestParam;

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
