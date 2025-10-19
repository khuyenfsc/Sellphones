package com.sellphones.dto.user.admin;

import com.sellphones.entity.user.RoleName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUser_RoleResponse {
    private Long id;

    private RoleName roleName;
}
