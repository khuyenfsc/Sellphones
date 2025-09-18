package com.sellphones.dto.product.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WarrantyResponse {

    private String name;

    private int numberOfMonths;

    private BigDecimal val;

    private String description;

}
