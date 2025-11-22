package com.sellphones.dto.product.admin;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminProductFilterResponse {

    private Long id;

    private String name;

    private AdminAttributeResponse attribute;

    private LocalDateTime createdAt;

}


