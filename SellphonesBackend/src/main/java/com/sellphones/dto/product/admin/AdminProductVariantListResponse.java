package com.sellphones.dto.product.admin;

import com.sellphones.entity.product.ProductVariantStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminProductVariantListResponse {

    private String productVariantName;

    private BigDecimal price;

    private ProductVariantStatus status;

    private String sku;

    private String variantImage;

}
