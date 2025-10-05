package com.sellphones.dto.product.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttributeValueResponse {

    private String strVal;

    private BigDecimal numericVal;

    private AttributeResponse attribute;
}
