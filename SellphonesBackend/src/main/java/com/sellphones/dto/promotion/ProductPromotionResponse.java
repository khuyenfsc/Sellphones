package com.sellphones.dto.promotion;

import com.sellphones.entity.promotion.PromotionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductPromotionResponse {

    private String name;

    private String description;

    private PromotionType type;

    private LocalDate startDate;

    private LocalDate endDate;


}
