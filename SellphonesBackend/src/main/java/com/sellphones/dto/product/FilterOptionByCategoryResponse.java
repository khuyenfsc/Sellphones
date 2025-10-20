package com.sellphones.dto.product;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterOptionByCategoryResponse {

//    private String name;
//
//    private List<FilterOption> filterOptions;
//    private Map<String, List<FilterOptionResponse>> filterOptions;

    private Long attributeId;

    private String name;

    private List<FilterOptionResponse> filterOptionResponses;
}
