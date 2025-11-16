package com.sellphones.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttributeValueResponse {

    private Long id;

    private String strVal;

    private BigDecimal numericVal;

    private AttributeResponse attribute;
}
