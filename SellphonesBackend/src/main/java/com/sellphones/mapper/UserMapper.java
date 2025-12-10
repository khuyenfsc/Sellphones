package com.sellphones.mapper;

import com.sellphones.dto.user.admin.AdminCreateUserRequest;
import com.sellphones.dto.user.admin.AdminUpdateRoleRequest;
import com.sellphones.dto.user.admin.AdminUpdateUserRequest;
import com.sellphones.entity.user.Provider;
import com.sellphones.entity.user.Role;
import com.sellphones.entity.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final PasswordEncoder passwordEncoder;

    public User mapCreatedToUserEntity(AdminCreateUserRequest request, Role role){
        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .status(request.getStatus())
                .dateOfBirth(request.getDateOfBirth())
                .phoneNumber(request.getPhoneNumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .gender(request.getGender())
                .provider(Provider.LOCAL)
                .createdAt(LocalDateTime.now())
                .build();

        return user;

    }

    public User mapToEditedUserEntity(User user, AdminUpdateUserRequest request, Role role) {

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setStatus(request.getStatus());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(role);
        user.setGender(request.getGender());
        user.setProvider(Provider.LOCAL);
        user.setCreatedAt(LocalDateTime.now());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        return user;
    }

}
