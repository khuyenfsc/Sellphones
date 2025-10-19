package com.sellphones.service.user.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.user.admin.AdminRoleDetailsResponse;
import com.sellphones.dto.user.admin.AdminRoleFilterRequest;
import com.sellphones.dto.user.admin.AdminRoleListResponse;
import com.sellphones.dto.user.admin.AdminRoleRequest;

public interface AdminRoleService {
    PageResponse<AdminRoleListResponse> getRoles(AdminRoleFilterRequest request);
    AdminRoleDetailsResponse getRoleDetails(Long id);
    void createRole(AdminRoleRequest request);
    void editRole(AdminRoleRequest request, Long id);
    void deleteRole(Long id);
}
