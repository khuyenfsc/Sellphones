package com.sellphones.dto.product.response;

import com.sellphones.entity.product.Warranty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariantResponse {

    private String productVariantName;

    private BigDecimal price;

    private String sku;

    private String variantImage;

    private List<ProductPromotionResponse> promotions;

    private Long stock;

    private List<WarrantyResponse> warranties;

    private List<AttributeValueResponse> attributeValues;
}
