package com.sellphones.redis;

import java.time.Duration;

public interface RedisOtpService {
    void saveRegisterOtp(String email, Otp otp, Duration duration);
    Otp getRegisterOtp(String email);
    void deleteRegisterOtp(String email);
    void saveForgotPasswordOtp(String email, Otp otp, Duration duration);
    Otp getForgotPasswordOtp(String email);
    void deleteForgotPasswordOtp(String email);
}
