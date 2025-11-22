package com.sellphones.dto.product.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminProductFilterRequest {
    @NotBlank
    private String name;

    @NotNull
    private Long attributeId;
}
