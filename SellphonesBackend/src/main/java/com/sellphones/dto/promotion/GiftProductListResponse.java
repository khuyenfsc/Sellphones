package com.sellphones.dto.promotion;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GiftProductListResponse {

    private String name;

    private String thumbnailUrl;

    private BigDecimal price;

}
