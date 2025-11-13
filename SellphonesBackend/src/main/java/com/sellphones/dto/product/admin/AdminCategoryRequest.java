package com.sellphones.dto.product.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminCategoryRequest {
    @NotBlank
    private String name;

    @NotBlank
    @Pattern(regexp = "\\S+", message = "Code must not contain spaces")
    private String code;

    private Boolean featuredOnHomepage;
}
