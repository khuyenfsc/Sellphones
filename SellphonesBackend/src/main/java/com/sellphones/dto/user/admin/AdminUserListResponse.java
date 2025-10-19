package com.sellphones.dto.user.admin;

import com.sellphones.entity.user.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserListResponse {

    private Long id;

    private String fullName;

    private String avatar;

    private String email;

    private UserStatus status;

    private AdminUser_RoleResponse role;
}
