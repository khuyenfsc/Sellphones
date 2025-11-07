package com.sellphones.dto.user;

import com.sellphones.entity.user.RoleName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasicRoleResponse {
    private RoleName roleName;
}
