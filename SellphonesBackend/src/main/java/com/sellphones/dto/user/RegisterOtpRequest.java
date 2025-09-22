package com.sellphones.dto.user;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterOtpRequest {

    @NotBlank
    private String activeToken;

    @Email
    private String email;

    @Size(min = 6, max = 6, message = "OTP must be exactly 6 characters")
    private String otp;

}
