package com.sellphones.service.user;

import com.sellphones.entity.user.Permission;
import com.sellphones.entity.user.Role;

import java.util.Set;

public interface RoleService {
    Set<String> getPermissionByRoleId(Long id);
}
