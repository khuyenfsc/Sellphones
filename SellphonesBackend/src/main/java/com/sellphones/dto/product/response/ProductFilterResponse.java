package com.sellphones.dto.product.response;

import com.sellphones.entity.product.FilterOption;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductFilterResponse {

    private String name;

    private List<FilterOptionResponse> filterOptions = new ArrayList<>();
}
