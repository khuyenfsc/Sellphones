package com.sellphones.dto.product.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailsVariantResponse {

    private Long id;

    private List<AttributeValueResponse> attributeValues;


}
