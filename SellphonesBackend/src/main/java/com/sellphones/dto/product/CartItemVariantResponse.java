package com.sellphones.dto.product;

import com.sellphones.dto.promotion.GiftProductResponse;
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

    private BigDecimal rootPrice;

    private BigDecimal currentPrice;

    private String variantImage;

    private Long stock;

    private Cart_ProductResponse product;

    private List<ProductPromotionResponse> promotions;

    private List<WarrantyResponse> warranties;

    private List<GiftProductResponse> giftProducts;

}
