package com.sellphones.dto.user;

import com.sellphones.entity.user.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {

    private String fullName;

    private String avatarUrl;

    private String email;

    private LocalDate dateOfBirth;

    private String phoneNumber;

    private Gender gender;

}
