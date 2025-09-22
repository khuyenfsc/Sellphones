package com.sellphones.service.authentication;


import com.nimbusds.jwt.JWTClaimsSet;
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
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Service;

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
        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(jwtClaimsSet.getClaim("email"), null, AuthorityUtils.commaSeparatedStringToAuthorityList(jwtClaimsSet.getClaim("authorities").toString()));
        String newAccessToken = jwtService.generateToken(authentication, TokenType.ACCESS);
        String newRefreshToken = jwtService.generateToken(authentication, TokenType.REFRESH);
        return new AuthenticationToken(newAccessToken, newRefreshToken);
    }

    @Override
    public void logout(LogoutRequest logoutRequest, String refreshToken) {
        String accessToken = logoutRequest.getAccessToken();
        jwtService.invalidateToken(accessToken);
        jwtService.invalidateToken(refreshToken);
    }


}
