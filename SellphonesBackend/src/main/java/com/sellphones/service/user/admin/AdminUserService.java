package com.sellphones.service.user.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.user.admin.AdminUpdateUserRequest;
import com.sellphones.dto.user.admin.AdminUserFilterRequest;
import com.sellphones.dto.user.admin.AdminCreateUserRequest;
import com.sellphones.dto.user.admin.AdminUserResponse;

public interface AdminUserService {
    PageResponse<AdminUserResponse> getUsers(AdminUserFilterRequest request);
    void createUser(AdminCreateUserRequest request);
    void editUser(AdminUpdateUserRequest request, Long id);
    void deleteUser(Long id);
}
