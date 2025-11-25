package com.sellphones.service.user.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.user.admin.AdminUserFilterRequest;
import com.sellphones.dto.user.admin.AdminUserRequest;
import com.sellphones.dto.user.admin.AdminUserResponse;
import org.springframework.web.multipart.MultipartFile;

public interface AdminUserService {
    PageResponse<AdminUserResponse> getUsers(AdminUserFilterRequest request);
    void createUser(AdminUserRequest request);
    void editUser(AdminUserRequest request, Long id);
    void deleteUser(Long id);
}
