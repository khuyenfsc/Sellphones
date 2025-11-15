package com.sellphones.dto.product.admin;

import com.sellphones.entity.product.ProductStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUpdateProductRequest {

    @NotBlank
    private String name;

    @NotNull
    private Long categoryId;

    private String description;

    @NotNull
    private Long brandId;

    private ProductStatus status;

    private Boolean isFeatured;

    private Boolean isNew;

    private String variantAttributeNames;
}
