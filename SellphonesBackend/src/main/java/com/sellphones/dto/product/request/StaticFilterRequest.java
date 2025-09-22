package com.sellphones.dto.product.request;

import com.sellphones.entity.product.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaticFilterRequest {
    private Long categoryId;
    private String priceRange;
    private Long brandId;
}
