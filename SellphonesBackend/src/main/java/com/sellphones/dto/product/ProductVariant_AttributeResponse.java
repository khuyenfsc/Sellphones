package com.sellphones.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariant_AttributeResponse {

    private AttributeResponse attribute;

    private List<ProductAttributeValueOptionResponse> allowValues;

}
