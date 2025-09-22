package com.sellphones.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForgotPasswordOtpRequest {

    @Email
    private String email;

    @Size(min = 6, max = 6, message = "OTP must be exactly 6 characters")
    private String otp;

}
