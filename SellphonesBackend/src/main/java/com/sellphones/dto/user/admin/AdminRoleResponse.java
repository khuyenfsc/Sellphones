package com.sellphones.dto.user.admin;

import com.sellphones.entity.user.RoleName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminRoleResponse {

    private Long id;

    private String name;

    private RoleName roleName;

    private LocalDateTime createdAt;

}
