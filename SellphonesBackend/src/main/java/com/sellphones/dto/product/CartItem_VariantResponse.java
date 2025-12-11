package com.sellphones.dto.product;

import com.sellphones.dto.promotion.GiftProductResponse;
import com.sellphones.dto.promotion.ProductPromotionResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem_VariantResponse {

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
