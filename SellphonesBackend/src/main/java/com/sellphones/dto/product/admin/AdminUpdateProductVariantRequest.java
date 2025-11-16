package com.sellphones.dto.product.admin;

import com.sellphones.annotation.VariantAttributeFormat;
import com.sellphones.entity.product.ProductStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUpdateProductVariantRequest {
    @NotBlank
    private String productVariantName;

    @NotNull
    private BigDecimal rootPrice;

    @NotNull
    private BigDecimal currentPrice;

    @NotNull
    private ProductStatus status;

    @VariantAttributeFormat
    private String variantAttributeValues;

    private List<Long> promotionIds;

    private List<Long> giftProductIds;

    private List<Long> attributeValueIds;

    private List<Long> warrantyIds;
}
