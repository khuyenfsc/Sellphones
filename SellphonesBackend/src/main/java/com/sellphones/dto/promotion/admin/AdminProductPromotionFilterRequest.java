package com.sellphones.dto.promotion.admin;

import com.sellphones.entity.promotion.PromotionType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminProductPromotionFilterRequest {

    private String name;

    private PromotionType type;

    private LocalDate startDate;

    private LocalDate endDate;

    private String sortType;

    @Min(0)
    private Integer page = 0;

    @Max(100)
    @Min(1)
    private Integer size = 5;

}
