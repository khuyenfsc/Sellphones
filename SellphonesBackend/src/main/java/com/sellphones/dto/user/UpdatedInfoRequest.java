package com.sellphones.dto.user;

import com.sellphones.entity.user.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdatedInfoRequest {

    @NotBlank
    private String fullName;

    @NotNull
    private LocalDate dateOfBirth;

    @NotNull
    private Gender gender;
}
