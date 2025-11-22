package com.sellphones.dto.product.admin;

import com.sellphones.entity.product.ConditionKey;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotNull
    private ConditionKey cond;

    @NotBlank
    private String val1;

    private String val2;

}
