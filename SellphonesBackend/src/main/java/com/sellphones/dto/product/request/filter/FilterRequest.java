package com.sellphones.dto.product.request.filter;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterRequest {
    private QueryRequest query;

    @Min(0)
    private Integer page;

    @Min(1)
    @Max(100)
    private Integer size;

    private String sort;
}
