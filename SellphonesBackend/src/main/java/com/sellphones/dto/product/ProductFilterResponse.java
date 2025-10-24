package com.sellphones.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductFilterResponse {

    private Long id;

    private String name;

    private List<FilterOptionResponse> filterOptions = new ArrayList<>();
}
