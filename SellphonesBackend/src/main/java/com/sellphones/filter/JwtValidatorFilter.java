package com.sellphones.filter;


import com.nimbusds.jwt.JWTClaimsSet;
import com.sellphones.configuration.CustomUserDetails;
import com.sellphones.constant.AppConstants;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.service.authentication.JwtService;
import com.sellphones.utils.SecurityUtils;
import io.jsonwebtoken.lang.Arrays;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class JwtValidatorFilter extends OncePerRequestFilter { ;

    private final JwtService jwtService;

    private static final AntPathMatcher pathMatcher = new AntPathMatcher();

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = SecurityUtils.extractTokenFromRequest(request);
            JWTClaimsSet jwtClaimsSet = jwtService.validateToken(jwt);
            String role = Optional.ofNullable(jwtClaimsSet.getClaimAsString("role"))
                    .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
            String username = jwtClaimsSet.getSubject();
            Object authClaim = jwtClaimsSet.getClaim("authorities");

            System.out.println("authorities " + authClaim.toString());

            List<GrantedAuthority> authorities = authClaim != null
                    ? AuthorityUtils.commaSeparatedStringToAuthorityList(authClaim.toString())
                    : Collections.emptyList();


            if(role == null){
                throw new AppException(ErrorCode.ROLE_NOT_FOUND);
            }

            boolean isAdminRequest = request.getRequestURI().startsWith("/api/v1/admin");
            if (isAdminRequest && !"ADMIN".equals(role)) {
                throw new AppException(ErrorCode.UNAUTHORIZED_ADMIN_ACCESS);
            }

            if (!isAdminRequest && !"CUSTOMER".equals(role)) {
                throw new AppException(ErrorCode.UNAUTHORIZED_CUSTOMER_ACCESS);
            }

            System.out.println("authorities " + authorities);
            UserDetails userDetails = new CustomUserDetails(role, username, null, authorities);
            Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(userDetails, null, authorities);
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
