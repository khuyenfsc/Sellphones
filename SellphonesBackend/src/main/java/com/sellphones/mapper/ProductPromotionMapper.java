package com.sellphones.mapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.dto.promotion.admin.AdminProductPromotionRequest;
import com.sellphones.entity.promotion.ProductPromotion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class ProductPromotionMapper {

    private final ObjectMapper objectMapper;

    public ProductPromotion mapToProductPromotionEntity(AdminProductPromotionRequest request){

        try {
            String config = objectMapper.writeValueAsString(request.getConfig());
            String condition = objectMapper.writeValueAsString(request.getCondition());

            ProductPromotion promotion = ProductPromotion.builder()
                    .name(request.getName())
                    .description(request.getDescription())
                    .type(request.getType())
                    .config(config)
                    .condition(condition)
                    .startDate(request.getStartDate())
                    .endDate(request.getEndDate())
                    .createdAt(LocalDateTime.now())
                    .build();
            return promotion;
        } catch (Exception e) {
            throw new RuntimeException("Failed to convert map to string", e);
        }
    }
}
