package com.sellphones.dto.product.admin;

import com.sellphones.dto.product.response.AttributeValueResponse;
import com.sellphones.dto.product.response.ProductDetailsBrandResponse;
import com.sellphones.dto.product.response.ProductDetailsCategoryResponse;
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

    private ProductDetailsBrandResponse brand;

    private List<String> images;

}
