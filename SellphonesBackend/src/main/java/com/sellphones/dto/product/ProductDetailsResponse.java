package com.sellphones.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailsResponse {

    private String name;

    private ProductDetailsCategoryResponse category;

    private String description;

    private ProductDetails_BrandResponse brand;

    private List<String> images;

    private List<ProductDetailsVariantResponse> productVariants;

    private ProductDetailsVariantResponse thumbnailProduct;

}
