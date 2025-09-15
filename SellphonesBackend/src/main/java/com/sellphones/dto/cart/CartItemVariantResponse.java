package com.sellphones.dto.cart;

import com.sellphones.dto.promotion.GiftProductListResponse;
import com.sellphones.dto.promotion.ProductPromotionResponse;
import com.sellphones.entity.product.Warranty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemVariantResponse {

    private Long id;

    private String productVariantName;

    private BigDecimal price;

    private String variantImage;

    private List<ProductPromotionResponse> promotions;

    private List<Warranty> warranties;

    private List<GiftProductListResponse> giftProducts;

}
