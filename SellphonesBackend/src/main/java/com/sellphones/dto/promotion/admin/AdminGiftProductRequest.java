package com.sellphones.dto.promotion.admin;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminGiftProductRequest {

    @NotBlank
    private String name;

    private Long stock;

    @NotBlank
    private String description;

    @Min(0)
    private Long price;
}
