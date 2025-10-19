package com.sellphones.dto.promotion.admin;

import com.sellphones.entity.promotion.PromotionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminProductPromotionResponse {

    private Long id;

    private String name;

    private String description;

    private PromotionType type;

    private Map<String, Object> config;

    private Map<String, Object> condition;

    private LocalDate startDate;

    private LocalDate endDate;

    private LocalDateTime createdAt;
}
