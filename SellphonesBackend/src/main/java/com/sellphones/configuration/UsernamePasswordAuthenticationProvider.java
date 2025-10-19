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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UsernamePasswordAuthenticationProvider implements AuthenticationProvider {

    private final UserDetailsService userDetailsService;

    private final PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        CustomUserDetails user = (CustomUserDetails) userDetailsService.loadUserByUsername(username);

        if(user.getStatus() == UserStatus.INACTIVE){
            throw new AppException(ErrorCode.USER_INACTIVE);
        }

        if(user.getProvider() == Provider.LOCAL){
            if(!passwordEncoder.matches(password, user.getPassword())){
                throw new AppException(ErrorCode.INVALID_PASSWORD);
            }
        }
        return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }
}
