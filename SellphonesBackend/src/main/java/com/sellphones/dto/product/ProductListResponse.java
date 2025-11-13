package com.sellphones.dto.product;

import com.sellphones.entity.product.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductListResponse {

    private Long id;

    private String name;

    private String thumbnail;

    private ProductThumbnailResponse productThumbnail;

    private ProductStatus status;

    private Double averageRating;

    private Boolean isFeatured;

    private Boolean isNew;

    private LocalDateTime createdAt;
}
