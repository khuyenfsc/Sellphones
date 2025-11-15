package com.sellphones.dto.product.admin;

import com.sellphones.dto.product.ProductDetails_BrandResponse;
import com.sellphones.dto.product.ProductDetails_CategoryResponse;
import com.sellphones.entity.product.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminProductDetailResponse {

    private String name;

    private String thumbnail;

    private ProductStatus status;

    private ProductDetails_CategoryResponse category;

    private String description;

    private AdminProductVariantResponse thumbnailProduct;

    private String variantAttributeNames;

    private ProductDetails_BrandResponse brand;

    private List<String> images;

    private Boolean isFeatured;

    private Boolean isNew;

}
