package com.sellphones.dto.user.admin;

import com.sellphones.entity.user.Gender;
import com.sellphones.entity.user.Provider;
import com.sellphones.entity.user.Role;
import com.sellphones.entity.user.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserRequest {

    private String fullName;

    private String email;

    private String password;

    private UserStatus status;

    private LocalDate dateOfBirth;

    private String phoneNumber;

    private Long roleId;

    private Gender gender;

}
