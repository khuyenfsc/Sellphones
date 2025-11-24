package com.sellphones.service.user.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.user.admin.*;

public interface AdminRoleService {
    PageResponse<AdminRoleResponse> getRoles(AdminRoleFilterRequest request);
    AdminRoleDetailsResponse getRoleDetails(Long id);
    AdminRoleResponse createRole(AdminCreateRoleRequest request);
    void editRole(AdminUpdateRoleRequest request, Long id);
    void deleteRole(Long id);
}
