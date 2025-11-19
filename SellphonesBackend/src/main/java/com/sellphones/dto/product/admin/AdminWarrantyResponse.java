package com.sellphones.dto.product.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminWarrantyResponse {

    private Long id;

    private String name;

    private int months;

    private BigDecimal price;

    private String description;

    private LocalDateTime createdAt;
}
