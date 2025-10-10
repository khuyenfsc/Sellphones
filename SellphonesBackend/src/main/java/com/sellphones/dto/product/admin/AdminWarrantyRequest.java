package com.sellphones.dto.product.admin;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminWarrantyRequest {

    @NotBlank
    private String name;

    @NotNull
    private Integer months;

    @NotNull
    private Long price;

    private String description;
}
