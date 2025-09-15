package com.sellphones.utils;

import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

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

}
