package com.sellphones.dto.product.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminCategoryResponse {

    private Long id;

    private String name;

    private String code;

    private LocalDateTime createdAt;

    private String icon;

    private Boolean featuredOnHomepage = false;

}
