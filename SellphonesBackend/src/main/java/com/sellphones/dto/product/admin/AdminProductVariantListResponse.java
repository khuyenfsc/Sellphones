package com.sellphones.dto.product.admin;

import com.sellphones.entity.product.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminProductVariantListResponse {

    private Long id;

    private String productVariantName;

    private BigDecimal currentPrice;

    private ProductStatus status;

    private String sku;

    private String variantImage;

    private Long stock;

}
