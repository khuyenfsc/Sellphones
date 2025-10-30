package com.sellphones.dto.product;

import com.sellphones.dto.promotion.GiftProductListResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariantResponse {

    private Long id;

    private String productVariantName;

    private BigDecimal rootPrice;

    private BigDecimal currentPrice;

    private String sku;

    private String variantImage;

    private List<ProductPromotionResponse> promotions;

    private List<GiftProductListResponse> giftProducts;

    private Long stock;

    private List<WarrantyResponse> warranties;

    private List<AttributeValueResponse> attributeValues;
}
