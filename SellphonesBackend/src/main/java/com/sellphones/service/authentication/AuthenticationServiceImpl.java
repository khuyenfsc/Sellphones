package com.sellphones.service.authentication;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.sellphones.dto.authentication.request.LogoutRequest;
import com.sellphones.dto.authentication.request.RefreshTokenRequest;
import com.sellphones.dto.authentication.response.AuthenticationResponse;
import com.sellphones.dto.user.UserRequest;
import com.sellphones.entity.authentication.AuthenticationToken;
import com.sellphones.entity.authentication.TokenType;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.time.Duration;
import java.util.Date;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Setter
@ConfigurationProperties(prefix = "app.jwt")
public class AuthenticationServiceImpl implements AuthenticationService{

    private final AuthenticationManager authenticationManager;

    private final RedisTemplate<String, Object> redisTemplate;

    private String secret;

    private Long access_expiration;

    private Long refresh_expiration;

    @Override
    public AuthenticationToken authenticate(UserRequest userRequest) {
        Authentication unauthentication = UsernamePasswordAuthenticationToken.unauthenticated(userRequest.getEmail(), userRequest.getPassword());
        Authentication authentication = authenticationManager.authenticate(unauthentication);
        String accessToken = generateToken(authentication, TokenType.ACCESS);
        String refreshToken = generateToken(authentication, TokenType.REFRESH);
        return new AuthenticationToken(accessToken, refreshToken);
    }

    @Override
    public AuthenticationToken refreshToken(String refreshToken){
        JWTClaimsSet jwtClaimsSet = validateToken(refreshToken);
        invalidateToken(refreshToken);
        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(jwtClaimsSet.getClaim("email"), null, AuthorityUtils.commaSeparatedStringToAuthorityList(jwtClaimsSet.getClaim("authorities").toString()));
        String newAccessToken = generateToken(authentication, TokenType.ACCESS);
        String newRefreshToken = generateToken(authentication, TokenType.REFRESH);
        return new AuthenticationToken(newAccessToken, newRefreshToken);
    }

    @Override
    public void logout(LogoutRequest logoutRequest, String refreshToken) {
        String accessToken = logoutRequest.getAccessToken();
        invalidateToken(accessToken);
        invalidateToken(refreshToken);
    }

    private void invalidateToken(String token){
        JWTClaimsSet jwtClaimsSet = validateToken(token);

        Date expirationTime = jwtClaimsSet.getExpirationTime();
        Duration ttl = Duration.between(new Date().toInstant(), expirationTime.toInstant());
        redisTemplate.opsForValue().set(jwtClaimsSet.getJWTID(), expirationTime, ttl);
    }


    @Override
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

            if (redisTemplate.opsForValue().get(jti) != null) {
                throw new AppException(ErrorCode.INVALID_TOKEN);
            }

            return jwtClaimsSet;
        } catch (ParseException e) {
            throw new AppException(ErrorCode.TOKEN_PARSE_ERROR);
        } catch (JOSEException e) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }
    }


    private String generateToken(Authentication authentication, TokenType tokenType) {
        try {
            JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);
            SecretKey secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");

            JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                    .issuer("khuyen")
                    .subject("jwt")
                    .claim("email", authentication.getName())
                    .claim("authorities", authentication.getAuthorities().stream()
                            .map(a -> a.getAuthority())
                            .collect(Collectors.joining(",")))
                    .issueTime(new Date())
                    .expirationTime(new Date(new Date().getTime() +
                            ((tokenType.equals(TokenType.ACCESS)) ? access_expiration : refresh_expiration)))
                    .jwtID(UUID.randomUUID().toString())
                    .build();

            SignedJWT signedJWT = new SignedJWT(header, jwtClaimsSet);
            JWSSigner signer = new MACSigner(secretKey.getEncoded());
            signedJWT.sign(signer);

            return signedJWT.serialize();
        } catch (JOSEException e) {
            throw new AppException(ErrorCode.TOKEN_GENERATION_FAILED);
        }
    }

}
