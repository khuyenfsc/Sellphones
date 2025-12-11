package com.sellphones.dto.product.admin;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminAttributeValue_FilterRequest {

    private String keyword;

    private String sortType;

    @Min(0)
    private Integer page = 0;

    @Min(1)
    private Integer size = 5;

}
