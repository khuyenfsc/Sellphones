package com.sellphones.dto.user.admin;

import com.sellphones.entity.user.Gender;
import com.sellphones.entity.user.Provider;
import com.sellphones.entity.user.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserResponse {

    private Long id;

    private String fullName;

    private String avatar;

    private String email;

    private UserStatus status;

    private LocalDate dateOfBirth;

    private String phoneNumber;

    private AdminUser_RoleResponse role;

    private Gender gender;

    private Provider provider;
}
