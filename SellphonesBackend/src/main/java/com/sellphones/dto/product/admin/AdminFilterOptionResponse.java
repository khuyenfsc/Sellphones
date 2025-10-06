package com.sellphones.dto.product.admin;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminFilterOptionResponse {

    private Long id;

    private String name;

    private String attributeName;

    private String key;

    private String val;

    @Nullable
    private String val2;

    private LocalDateTime createdAt;

}
