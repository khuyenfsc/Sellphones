package com.sellphones.dto.product.admin;

import com.sellphones.dto.product.ProductDetails_BrandResponse;
import com.sellphones.dto.product.ProductDetailsCategoryResponse;
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

    private ProductDetailsCategoryResponse category;

    private String description;

    private ProductDetails_BrandResponse brand;

    private List<String> images;

}
