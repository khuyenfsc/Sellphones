package com.sellphones.mapper;

import com.sellphones.dto.user.admin.AdminUserRequest;
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

    public User mapToUserEntity(AdminUserRequest request, Role role, String avatar){
        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .avatar(avatar)
                .password(passwordEncoder.encode(request.getPassword()))
                .status(request.getStatus())
                .dateOfBirth(request.getDateOfBirth())
                .phoneNumber(request.getPhoneNumber())
                .role(role)
                .gender(request.getGender())
                .provider(Provider.LOCAL)
                .createdAt(LocalDateTime.now())
                .build();

        return user;

    }

}
