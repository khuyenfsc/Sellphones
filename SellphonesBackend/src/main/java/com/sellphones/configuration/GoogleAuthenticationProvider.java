package com.sellphones.configuration;

import com.sellphones.entity.user.Provider;
import com.sellphones.entity.user.UserStatus;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GoogleAuthenticationProvider implements AuthenticationProvider {

    private final UserDetailsService userDetailsService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        CustomUserDetails user = (CustomUserDetails) userDetailsService.loadUserByUsername(username);

        if(user.getStatus() == UserStatus.INACTIVE){
            throw new AppException(ErrorCode.USER_INACTIVE);
        }

        if(user.getProvider() != Provider.GOOGLE){
            throw new AppException(ErrorCode.INVALID_LOGIN_METHOD);
        }

        return new GoogleAuthenticationToken(user, user.getAuthorities());

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (GoogleAuthenticationToken.class.isAssignableFrom(authentication));
    }
}
