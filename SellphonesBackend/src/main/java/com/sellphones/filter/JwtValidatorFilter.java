package com.sellphones.filter;


import com.nimbusds.jwt.JWTClaimsSet;
import com.sellphones.constant.AppConstants;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.service.authentication.AuthenticationService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
public class JwtValidatorFilter extends OncePerRequestFilter { ;

    private final AuthenticationService authenticationService;
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String jwt = authHeader.split(" ")[1];
                JWTClaimsSet jwtClaimsSet = authenticationService.validateToken(jwt);

                Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(
                        jwtClaimsSet.getClaim("email").toString(),
                        null,
                        AuthorityUtils.commaSeparatedStringToAuthorityList(jwtClaimsSet.getClaim("authorities").toString())
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            filterChain.doFilter(request, response); // tiếp tục nếu hợp lệ
        } catch (AppException ex) {
            response.setStatus(ex.getErrorCode().getStatusCode().value());
            response.setContentType("application/json");
            String body = String.format("{\"code\": %d, \"message\": \"%s\"}",
                    ex.getErrorCode().getStatusCode().value(),
                    ex.getErrorCode().getMessage());
            response.getWriter().write(body);
            response.getWriter().flush();
        } catch (Exception ex) {
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setContentType("application/json");
            response.getWriter().write("{\"code\":500,\"message\":\"Internal Server Error\"}");
            response.getWriter().flush();
        }
    }



}
