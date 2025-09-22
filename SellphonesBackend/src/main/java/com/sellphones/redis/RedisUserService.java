package com.sellphones.redis;

import com.sellphones.entity.user.User;

import java.time.Duration;

public interface RedisUserService {

    void saveUser(String activeToken, User user, Duration duration);

    User getUser(String activeToken);

    void deleteUser(String activeToken);
}
