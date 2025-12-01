package com.sellphones.dto.user.admin;

import com.sellphones.entity.user.Gender;
import com.sellphones.entity.user.Provider;
import com.sellphones.entity.user.Role;
import com.sellphones.entity.user.UserStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserRequest {

    @NotBlank
    private String fullName;

    @NotBlank
    private String email;

    private String password;

    @NotNull
    private UserStatus status;

    @NotNull
    private LocalDate dateOfBirth;

    private String phoneNumber;

    @NotNull
    private Long roleId;

    @NotNull
    private Gender gender;

}
