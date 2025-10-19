package com.sellphones.dto.promotion.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminPromotionConfigResponse {
    private Map<String, Object> config;
}
