package com.sellphones.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailsResponse {

    private String name;

    private ProductDetails_CategoryResponse category;

    private String description;

    private BigDecimal averageRating;

    private Long totalReviews;

    private ProductDetails_BrandResponse brand;

    private String variantAttributeNames;

    private List<String> images;

    private List<ProductDetails_VariantResponse> productVariants;

    private ProductDetails_VariantResponse thumbnailProduct;

}
