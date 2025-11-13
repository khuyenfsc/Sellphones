package com.sellphones.dto.product.admin;

import com.sellphones.entity.product.ProductStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminProductVariantRequest {

    @NotBlank
    private String productVariantName;

    private BigDecimal rootPrice;

    private BigDecimal currentPrice;

    private ProductStatus status;

    private List<Long> promotionIds;

    private List<Long> giftProductIds;

    private List<Long> attributeValueIds;

    private List<Long> warrantyIds;
}