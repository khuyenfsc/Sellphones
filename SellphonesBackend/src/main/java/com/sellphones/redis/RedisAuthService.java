package com.sellphones.redis;

import java.time.Duration;
import java.util.Date;

public interface RedisAuthService {
    void saveJwtExpirationTime(String jwtId, Date expirationTime, Duration ttl);
    Date getJwtExpirationTime(String jwtId);
    void saveResetPasswordEmail(String resetToken, String email, Duration duration);
    String getResetPasswordEmail(String resetToken);
    void deleteResetPasswordEmail(String resetToken);
    void saveRegisterEmail(String activeToken,String email, Duration duration);
    String getRegisterEmail(String activeToken);
    void deleteRegisterEmail(String activeToken);
}
