package com.sellphones.redis.impl;

import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.redis.RedisAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class RedisAuthServiceImpl implements RedisAuthService {

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void saveJwtExpirationTime(String jwtId, Date expirationTime, Duration ttl) {
        redisTemplate.opsForValue().set(jwtId, expirationTime, ttl);
    }

    @Override
    public Date getJwtExpirationTime(String jwtId) {
        return (Date) redisTemplate.opsForValue().get(jwtId);
    }

    @Override
    public void saveResetPasswordEmail(String resetToken, String email, Duration duration) {
        redisTemplate.opsForValue().set(resetToken, email, duration);
    }

    @Override
    public String getResetPasswordEmail(String resetToken) {
        Object email = redisTemplate.opsForValue().get(resetToken);
        if(email == null){
            throw new AppException(ErrorCode.INVALID_RESET_PASSWORD_TOKEN);
        }

        return email.toString();
    }

    @Override
    public void deleteResetPasswordEmail(String resetToken) {
        redisTemplate.delete(resetToken);
    }

    @Override
    public void saveRegisterEmail(String activeToken, String email, Duration duration) {
        redisTemplate.opsForValue().set(activeToken, email, duration);
    }

    @Override
    public String getRegisterEmail(String activeToken) {
        Object  email = redisTemplate.opsForValue().get(activeToken);
        if(email == null){
            throw new AppException(ErrorCode.INVALID_ACTIVE_TOKEN);
        }
        return email.toString();
    }

    @Override
    public void deleteRegisterEmail(String activeToken) {
        redisTemplate.delete(activeToken);
    }
}
