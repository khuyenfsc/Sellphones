package com.sellphones.dto.promotion.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminGiftProductResponse {

    private Long id;

    private String name;

    private Long stock;

    private String thumbnail;

    private BigDecimal price;

    private String description;

    private LocalDateTime createdAt;

}
