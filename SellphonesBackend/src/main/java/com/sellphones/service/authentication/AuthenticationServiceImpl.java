package com.sellphones.service.authentication;


import com.nimbusds.jwt.JWTClaimsSet;
import com.sellphones.configuration.CustomUserDetails;
import com.sellphones.dto.authentication.request.LogoutRequest;
import com.sellphones.dto.user.UserRequest;
import com.sellphones.entity.authentication.AuthenticationToken;
import com.sellphones.entity.authentication.TokenType;
import com.sellphones.entity.user.RoleName;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Setter
@ConfigurationProperties(prefix = "spring.jwt")
public class AuthenticationServiceImpl implements AuthenticationService{

    private final JwtService jwtService;

    @Override
    public AuthenticationToken authenticate(AuthenticationAction authenticationAction, UserRequest userRequest, RoleName roleName) {
        return authenticationAction.authenticate(userRequest, roleName);
    }

    @Override
    public AuthenticationToken refreshToken(String refreshToken){
        JWTClaimsSet jwtClaimsSet = jwtService.validateToken(refreshToken);
        jwtService.invalidateToken(refreshToken);

        String username = jwtClaimsSet.getSubject();
        String role = jwtClaimsSet.getClaim("role").toString();
        Object authClaim = jwtClaimsSet.getClaim("authorities");
        List<GrantedAuthority> authorities = authClaim != null
                ? AuthorityUtils.commaSeparatedStringToAuthorityList(authClaim.toString())
                : Collections.emptyList();

        UserDetails userDetails = new CustomUserDetails(role, username, null , authorities);

        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(userDetails, null, authorities);
        String newAccessToken = jwtService.generateToken(authentication, TokenType.ACCESS, jwtClaimsSet.getClaim("role").toString());
        String newRefreshToken = jwtService.generateToken(authentication, TokenType.REFRESH, jwtClaimsSet.getClaim("role").toString());
        return new AuthenticationToken(newAccessToken, newRefreshToken);
    }

    @Override
    public void logout(LogoutRequest logoutRequest, String refreshToken) {
        String accessToken = logoutRequest.getAccessToken();
        jwtService.invalidateToken(accessToken);
        jwtService.invalidateToken(refreshToken);
    }


}
