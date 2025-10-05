package com.sellphones.dto.product.response;

import com.sellphones.dto.promotion.GiftProductListResponse;
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

    private ProductDetailsBrandResponse brand;

    private List<String> imageUrls;

    private List<ProductDetailsVariantResponse> productVariants;

    private List<GiftProductListResponse> giftProducts;

}
