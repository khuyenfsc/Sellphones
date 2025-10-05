package com.sellphones.dto.product.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminProductRequest {

    @NotBlank
    private String name;

    @NotNull
    private Long categoryId;

    private String description;

    @NotNull
    private Long brandId;

}
