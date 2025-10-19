package com.sellphones.dto.user.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminRole_PermissionResponse {
    private Long id;

    private String name;

    private String code;
}
