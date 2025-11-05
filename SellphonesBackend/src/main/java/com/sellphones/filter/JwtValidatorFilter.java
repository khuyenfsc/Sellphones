package com.sellphones.filter;


import com.nimbusds.jwt.JWTClaimsSet;
import com.sellphones.configuration.CustomUserDetails;
import com.sellphones.configuration.JwtAuthenticationToken;
import com.sellphones.constant.AppConstants;
import com.sellphones.entity.user.Permission;
import com.sellphones.entity.user.Role;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.service.authentication.JwtService;
import com.sellphones.service.user.RoleService;
import com.sellphones.utils.SecurityUtils;
import io.jsonwebtoken.lang.Arrays;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
@Slf4j
public class JwtValidatorFilter extends OncePerRequestFilter { ;

    private final JwtService jwtService;

    private final RoleService roleService;

    private static final AntPathMatcher pathMatcher = new AntPathMatcher();

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = SecurityUtils.extractTokenFromRequest(request);
            JWTClaimsSet jwtClaimsSet = jwtService.validateToken(jwt);
            String roleName = Optional.ofNullable(jwtClaimsSet.getClaimAsString("role"))
                    .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
            String username = jwtClaimsSet.getSubject();
            Object roleId = jwtClaimsSet.getClaim("roleId");

            Set<String> permissions = roleService.getPermissionByRoleId(Long.parseLong(roleId.toString()));
            List<SimpleGrantedAuthority> authorities = permissions.stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());;
            authorities.add(new SimpleGrantedAuthority(roleName));

            if(roleName == null){
                throw new AppException(ErrorCode.ROLE_NOT_FOUND);
            }

            boolean isAdminRequest = request.getRequestURI().startsWith("/api/v1/admin");
            if (isAdminRequest && !"ADMIN".equals(roleName)) {
                throw new AppException(ErrorCode.UNAUTHORIZED_ADMIN_ACCESS);
            }

            if (!isAdminRequest && !"CUSTOMER".equals(roleName)) {
                throw new AppException(ErrorCode.UNAUTHORIZED_CUSTOMER_ACCESS);
            }

//            UserDetails userDetails = new CustomUserDetails(roleName, username, null, authorities);
            UserDetails userDetails = CustomUserDetails.builder()
                    .role(roleName)
                    .username(username)
                    .authorities(authorities)
                    .build();

//            Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(userDetails, null, authorities);
            Authentication authentication = new JwtAuthenticationToken(userDetails, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (AppException ex) {
            writeErrorResponse(response,
                    ex.getErrorCode().getStatusCode().value(),
                    ex.getErrorCode().getMessage());
            return;
        } catch (Exception ex) {
//            log.error("Error at JwtValidatorFilter {}", ex.getMessage());
            ex.printStackTrace();
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
