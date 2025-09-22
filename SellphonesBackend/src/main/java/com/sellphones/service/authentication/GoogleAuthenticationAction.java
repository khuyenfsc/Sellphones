package com.sellphones.service.authentication;

import com.sellphones.dto.user.UserRequest;
import com.sellphones.entity.authentication.AuthenticationToken;
import com.sellphones.entity.authentication.TokenType;
import com.sellphones.entity.user.RoleName;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GoogleAuthenticationAction implements AuthenticationAction{

    private final JwtService jwtService;

    @Override
    public AuthenticationToken authenticate(UserRequest userRequest, RoleName roleName) {
        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(userRequest.getEmail(), userRequest.getPassword(), List.of(new SimpleGrantedAuthority("CUSTOMER")));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = jwtService.generateToken(authentication, TokenType.ACCESS);
        String refreshToken = jwtService.generateToken(authentication, TokenType.REFRESH);
        return new AuthenticationToken(accessToken, refreshToken);
    }
}
