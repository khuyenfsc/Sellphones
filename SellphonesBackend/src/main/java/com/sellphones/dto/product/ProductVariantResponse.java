package com.sellphones.dto.product;

import com.sellphones.dto.promotion.GiftProductResponse;
import com.sellphones.dto.promotion.ProductPromotionResponse;
import com.sellphones.entity.product.ProductStatus;
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

    private ProductStatus status;

    private String sku;

    private String variantAttributeValues;

    private String variantImage;

    private List<ProductPromotionResponse> promotions;

    private List<GiftProductResponse> giftProducts;

    private Long stock;

    private List<WarrantyResponse> warranties;

    private List<AttributeValueResponse> attributeValues;
}
