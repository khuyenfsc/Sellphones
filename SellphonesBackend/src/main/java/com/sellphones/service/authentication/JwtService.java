package com.sellphones.service.authentication;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.sellphones.entity.authentication.TokenType;
import com.sellphones.entity.user.RoleName;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.redis.RedisAuthService;
import com.sellphones.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.time.Duration;
import java.util.Date;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Setter
@ConfigurationProperties(prefix = "spring.jwt")
public class JwtService {

    private final RedisAuthService redisAuthService;

    private final UserRepository userRepository;

    private String secret;

    private Long access_expiration;

    private Long refresh_expiration;


    public String generateToken(Authentication authentication, TokenType tokenType, String roleName) {
        try {
            SecretKey secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");

            long expiration = tokenType.equals(TokenType.ACCESS) ? access_expiration : refresh_expiration;
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

            JWTClaimsSet claims = new JWTClaimsSet.Builder()
                    .issuer("khuyen")
                    .subject(userDetails.getUsername())
                    .claim("role", roleName)
                    .claim("authorities", authentication.getAuthorities().stream()
                            .map(GrantedAuthority::getAuthority)
                            .collect(Collectors.joining(",")))
                    .issueTime(new Date())
                    .expirationTime(new Date(System.currentTimeMillis() + expiration))
                    .jwtID(UUID.randomUUID().toString())
                    .build();

            SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claims);
            signedJWT.sign(new MACSigner(secretKey.getEncoded()));

            return signedJWT.serialize();
        } catch (JOSEException e) {
            throw new AppException(ErrorCode.TOKEN_GENERATION_FAILED);
        }
    }

    public void invalidateToken(String token){
        JWTClaimsSet jwtClaimsSet = validateToken(token);

        Date expirationTime = jwtClaimsSet.getExpirationTime();
        Duration ttl = Duration.between(new Date().toInstant(), expirationTime.toInstant());
        redisAuthService.saveJwtExpirationTime(jwtClaimsSet.getJWTID(), expirationTime, ttl);
    }


    public JWTClaimsSet validateToken(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWTClaimsSet jwtClaimsSet = signedJWT.getJWTClaimsSet();
            String jti = jwtClaimsSet.getJWTID();
            SecretKey secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            JWSVerifier verifier = new MACVerifier(secretKey.getEncoded());

            Date expirationTime = jwtClaimsSet.getExpirationTime();
            if (expirationTime.before(new Date())) {
                throw new AppException(ErrorCode.TOKEN_EXPIRED);
            }

            if (!signedJWT.verify(verifier)) {
                throw new AppException(ErrorCode.INVALID_TOKEN);
            }

            if (redisAuthService.getJwtExpirationTime(jti) != null) {
                throw new AppException(ErrorCode.INVALID_TOKEN);
            }

            return jwtClaimsSet;
        } catch (ParseException e) {
            throw new AppException(ErrorCode.TOKEN_PARSE_ERROR);
        } catch (JOSEException e) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }
    }
}

