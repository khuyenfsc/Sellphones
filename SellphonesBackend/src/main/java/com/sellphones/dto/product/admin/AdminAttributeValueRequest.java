package com.sellphones.dto.product.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminAttributeValueRequest {

    private String strVal;

    private Long numericVal;

}
