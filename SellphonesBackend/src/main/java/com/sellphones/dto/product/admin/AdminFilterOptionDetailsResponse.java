package com.sellphones.dto.product.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminFilterOptionDetailsResponse {

    private Long id;

    private String name;

    private String key;

    private String val1;

    private String val2;

    private LocalDateTime createdAt;

}
