package com.sellphones.redis.impl;

import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.redis.Otp;
import com.sellphones.redis.RedisOtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class RedisOtpServiceImpl implements RedisOtpService {

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void saveRegisterOtp(String email, Otp otp, Duration duration) {
        redisTemplate.opsForValue().set(email,otp, duration);
    }

    @Override
    public Otp getRegisterOtp(String email) {
        Object otp = redisTemplate.opsForValue().get(email);
        if(otp == null){
            throw new AppException(ErrorCode.OTP_NOT_FOUND_FOR_EMAIL);
        }
        return (Otp) otp;
    }

    @Override
    public void deleteRegisterOtp(String email) {
        redisTemplate.delete(email);
    }

    @Override
    public void saveForgotPasswordOtp(String email, Otp otp, Duration duration) {
        redisTemplate.opsForValue().set(email, otp, duration);
    }

    @Override
    public Otp getForgotPasswordOtp(String email) {
        Object otp = redisTemplate.opsForValue().get(email);
        if(otp == null){
            throw new AppException(ErrorCode.OTP_NOT_FOUND_FOR_EMAIL);
        }
        return (Otp) otp;
    }

    @Override
    public void deleteForgotPasswordOtp(String email) {
        redisTemplate.delete(email);
    }
}
