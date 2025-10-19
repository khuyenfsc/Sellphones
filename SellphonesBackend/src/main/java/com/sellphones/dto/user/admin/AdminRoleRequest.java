package com.sellphones.dto.user.admin;

import com.sellphones.entity.user.RoleName;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminRoleRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotNull
    private RoleName roleName;

    private List<Long> permissionIds;
}
