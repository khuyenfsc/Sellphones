package com.sellphones.service.user.admin;

import com.sellphones.dto.user.admin.AdminPermissionResponse;

import java.util.Set;

public interface AdminPermissionService {
    Set<AdminPermissionResponse> getAllAdminPermissions();
}
