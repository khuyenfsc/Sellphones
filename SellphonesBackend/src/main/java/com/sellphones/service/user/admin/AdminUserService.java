package com.sellphones.service.user.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.user.admin.AdminUserFilterRequest;
import com.sellphones.dto.user.admin.AdminUserListResponse;

public interface AdminUserService {
    PageResponse<AdminUserListResponse> getUsers(AdminUserFilterRequest request);

}
