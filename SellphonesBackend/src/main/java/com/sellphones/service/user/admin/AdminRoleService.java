package com.sellphones.service.user.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.user.admin.*;

import java.util.List;

public interface AdminRoleService {
    List<AdminRoleResponse> getAllRoles();
    PageResponse<AdminRoleResponse> getRoles(AdminRoleFilterRequest request);
    AdminRoleDetailsResponse getRoleDetails(Long id);
    AdminRoleResponse createRole(AdminCreateRoleRequest request);
    void editRole(AdminUpdateRoleRequest request, Long id);
    void deleteRole(Long id);
}
