package com.sellphones.dto.product.admin;

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
public class AdminProductVariantResponse {

    private Long id;

    private String productVariantName;

    private BigDecimal currentPrice;

    private BigDecimal rootPrice;

    private ProductStatus status;

    private String sku;

    private String variantImage;

    private Long stock;

    private List<AdminWarrantyResponse> warranties;

    private List<ProductPromotionResponse> promotions;

    private List<GiftProductResponse> giftProducts;

}
