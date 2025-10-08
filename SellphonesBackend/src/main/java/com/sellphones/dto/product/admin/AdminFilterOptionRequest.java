package com.sellphones.dto.product.admin;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminFilterOptionRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String key;

    @NotBlank
    private String val1;

    private String val2;

}
