package com.sellphones.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterOptionResponse {

    private Long id;

    private String name;

    private String condition;

}
