package com.sellphones.service.user.admin;

import com.sellphones.dto.user.admin.AdminPermissionResponse;

import java.util.List;
import java.util.Set;

public interface AdminPermissionService {
    List<AdminPermissionResponse> getAllAdminPermissions();
}
