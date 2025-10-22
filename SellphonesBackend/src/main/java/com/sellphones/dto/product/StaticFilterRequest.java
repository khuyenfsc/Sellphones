package com.sellphones.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaticFilterRequest {
    private String categoryName;
    private String priceRange;
    private Long brandId;
    private Boolean isFeatured;
}
