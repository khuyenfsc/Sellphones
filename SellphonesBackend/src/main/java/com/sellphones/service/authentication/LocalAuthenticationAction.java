package com.sellphones.service.authentication;

import com.sellphones.configuration.CustomUserDetails;
import com.sellphones.dto.user.UserRequest;
import com.sellphones.entity.authentication.AuthenticationToken;
import com.sellphones.entity.authentication.TokenType;
import com.sellphones.entity.user.RoleName;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocalAuthenticationAction implements AuthenticationAction{

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final JwtService jwtService;

    @Override
    public AuthenticationToken authenticate(UserRequest userRequest, RoleName roleName) {
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
