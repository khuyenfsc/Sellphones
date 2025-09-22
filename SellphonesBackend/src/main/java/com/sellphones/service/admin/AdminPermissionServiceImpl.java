package com.sellphones.service.admin;

import com.sellphones.dto.user.admin.AdminPermissionResponse;
import com.sellphones.entity.user.User;
import com.sellphones.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminPermissionServiceImpl implements AdminPermissionService{

    private final UserRepository userRepository;

    @Override
    public AdminPermissionResponse getAllAdminPermissions() {
        User user = userRepository.findByEmail()
        return null;
    }
}
