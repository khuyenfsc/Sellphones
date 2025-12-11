package com.sellphones.service.authentication;

import com.sellphones.configuration.CustomUserDetails;
import com.sellphones.configuration.GoogleAuthenticationToken;
import com.sellphones.dto.user.UserRequest;
import com.sellphones.entity.authentication.AuthenticationToken;
import com.sellphones.entity.authentication.TokenType;
import com.sellphones.entity.user.RoleName;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GoogleAuthenticationAction implements AuthenticationAction{

    private final JwtUtils jwtUtils;

    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationToken authenticate(UserRequest userRequest, RoleName roleName) {
     Authentication unauthentication = GoogleAuthenticationToken.unauthenticated(userRequest.getEmail());
        Authentication authentication = authenticationManager.authenticate(unauthentication);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        if(!userDetails.getRole().equals(roleName.toString())){
            throw new AppException(ErrorCode.INVALID_ROLE);
        }


        String accessToken = jwtUtils.generateToken(authentication, TokenType.ACCESS, roleName.toString());
        String refreshToken = jwtUtils.generateToken(authentication, TokenType.REFRESH, roleName.toString());
        return new AuthenticationToken(accessToken, refreshToken);
    }
}
