package com.sellphones.utils;

import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.Duration;

public class SecurityUtils {

    public static String extractTokenFromRequest(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try{
                String jwt = authHeader.split(" ")[1];
                return jwt;
            } catch (RuntimeException e) {
                throw new AppException(ErrorCode.INVALID_AUTHORIZATION_HEADER);
            }
        }

        throw new AppException(ErrorCode.INVALID_AUTHORIZATION_HEADER);
    }

    public static String extractNameFromAuthentication(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    public static void setRefreshTokenToCookie(HttpServletResponse response, String refreshToken){
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .domain("localhost")
                .maxAge(Duration.ofDays(14))
                .sameSite("strict")
                .secure(false)
                .path("/")
                .build();
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

}
