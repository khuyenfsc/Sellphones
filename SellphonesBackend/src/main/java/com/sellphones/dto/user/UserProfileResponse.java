package com.sellphones.dto.user;

import com.sellphones.entity.user.Gender;
import com.sellphones.entity.user.Provider;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {

    private String fullName;

    private String email;

    private LocalDate dateOfBirth;

    private String phoneNumber;

    private Gender gender;

    private Provider provider;

}
