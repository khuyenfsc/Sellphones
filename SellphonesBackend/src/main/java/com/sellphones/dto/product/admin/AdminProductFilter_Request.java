package com.sellphones.dto.product.admin;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminProductFilter_Request {

    private Long id;

    private String keyword;

    private Long price;

    private String categoryName;

    private String brandName;

    @Min(0)
    private Integer page = 0;

    @Min(1)
    private Integer size = 10;

    private String sortType;
}
