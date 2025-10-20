package com.sellphones.service.authentication;

import com.sellphones.configuration.CustomUserDetails;
import com.sellphones.dto.user.UserRequest;
import com.sellphones.entity.authentication.AuthenticationToken;
import com.sellphones.entity.authentication.TokenType;
import com.sellphones.entity.user.RoleName;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GoogleAuthenticationAction implements AuthenticationAction{

    private final JwtService jwtService;

    private final AuthenticationConfiguration authenticationConfiguration;

    @Override
    public AuthenticationToken authenticate(UserRequest userRequest, RoleName roleName) {
//        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(userRequest.getEmail(), userRequest.getPassword(), List.of(new SimpleGrantedAuthority("CUSTOMER")));
//        SecurityContextHolder.getContext().setAuthentication(authentication);

        AuthenticationManager authenticationManager = null;
        try {
            authenticationManager = authenticationConfiguration.getAuthenticationManager();
        } catch (Exception e) {
            throw new AppException(ErrorCode.GET_AUTHENTICATION_MANAGER_FAILED);
        }
        Authentication unauthentication = UsernamePasswordAuthenticationToken.unauthenticated(userRequest.getEmail(), userRequest.getPassword());
        Authentication authentication = authenticationManager.authenticate(unauthentication);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        if(!userDetails.getRole().equals(roleName.toString())){
            throw new AppException(ErrorCode.INVALID_ROLE);
        }


        String accessToken = jwtService.generateToken(authentication, TokenType.ACCESS, roleName.toString());
        String refreshToken = jwtService.generateToken(authentication, TokenType.REFRESH, roleName.toString());
        return new AuthenticationToken(accessToken, refreshToken);
    }
}
