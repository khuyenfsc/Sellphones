package com.sellphones.filter;


import com.nimbusds.jwt.JWTClaimsSet;
import com.sellphones.constant.AppConstants;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.service.authentication.AuthenticationService;
import com.sellphones.utils.SecurityUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.lang.Arrays;
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
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.lang.reflect.Array;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
public class JwtValidatorFilter extends OncePerRequestFilter { ;

    private final AuthenticationService authenticationService;

    private static final AntPathMatcher pathMatcher = new AntPathMatcher();

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = SecurityUtils.extractTokenFromRequest(request);
            JWTClaimsSet jwtClaimsSet = authenticationService.validateToken(jwt);

            Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(
                    jwtClaimsSet.getClaim("email").toString(),
                    null,
                    AuthorityUtils.commaSeparatedStringToAuthorityList(
                            jwtClaimsSet.getClaim("authorities").toString())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (AppException ex) {
            writeErrorResponse(response,
                    ex.getErrorCode().getStatusCode().value(),
                    ex.getErrorCode().getMessage());
            return;
        } catch (Exception ex) {
            writeErrorResponse(response, HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Internal Server Error");
            return;
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return Arrays.asList(AppConstants.PUBLIC_ENDPOINTS).stream()
                .anyMatch(pattern -> pathMatcher.match(pattern, path));
    }

    private void writeErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String body = String.format("{\"code\": %d, \"message\": \"%s\"}", status, message);
        response.getWriter().write(body);
        response.getWriter().flush();
    }

}
