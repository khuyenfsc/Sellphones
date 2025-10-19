package com.sellphones.dto.user.admin;

import com.sellphones.entity.user.Permission;
import com.sellphones.entity.user.RoleName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminRoleDetailsResponse {

    private Long id;

    private String name;

    private String description;

    private RoleName roleName;

    private Set<AdminRole_PermissionResponse> permissions;

    private LocalDateTime createdAt;
}
