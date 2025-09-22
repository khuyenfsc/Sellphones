package com.sellphones.redis.impl;

import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.redis.RedisUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RedisUserServiceImpl implements RedisUserService {

    private final RedisTemplate<String, Object> redisTemplate;


    @Override
    public void saveUser(String activeToken, User user, Duration duration) {
        redisTemplate.opsForValue().set(activeToken, user, duration);
    }

    @Override
    public User getUser(String activeToken) {
        Object user = redisTemplate.opsForValue().get(activeToken);
        if(user == null){
            throw new AppException(ErrorCode.USER_NOT_FOUND_FOR_ACTIVE_TOKEN);
        }
        return (User) redisTemplate.opsForValue().get(activeToken);
    }

    @Override
    public void deleteUser(String activeToken) {
        redisTemplate.delete(activeToken);
    }
}
