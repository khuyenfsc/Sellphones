package com.sellphones.service.authentication;


import com.nimbusds.jwt.JWTClaimsSet;
import com.sellphones.configuration.CustomUserDetails;
import com.sellphones.dto.authentication.LogoutRequest;
import com.sellphones.dto.user.BasicUserResponse;
import com.sellphones.dto.user.UserRequest;
import com.sellphones.entity.authentication.AuthenticationToken;
import com.sellphones.entity.authentication.TokenType;
import com.sellphones.entity.user.RoleName;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.user.UserRepository;
import com.sellphones.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
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

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

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

//        UserDetails userDetails = new CustomUserDetails(role, username, null , authorities);
        UserDetails userDetails = CustomUserDetails.builder()
                .username(username)
                .role(role)
                .authorities(authorities)
                .build();

        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(userDetails, null, authorities);
        String newAccessToken = jwtService.generateToken(authentication, TokenType.ACCESS, jwtClaimsSet.getClaim("role").toString());
        String newRefreshToken = jwtService.generateToken(authentication, TokenType.REFRESH, jwtClaimsSet.getClaim("role").toString());
        return new AuthenticationToken(newAccessToken, newRefreshToken);
    }

    @Override
    @Cacheable(value = "me", key = "#root.methodName + '_' + T(org.springframework.security.core.context.SecurityContextHolder).getContext().getAuthentication().getName()")
    public BasicUserResponse getCurrentUser() {
        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return modelMapper.map(user, BasicUserResponse.class);
    }

    @Override
    public void logout(LogoutRequest logoutRequest, String refreshToken) {
        String accessToken = logoutRequest.getAccessToken();
        jwtService.invalidateToken(accessToken);
        jwtService.invalidateToken(refreshToken);
    }


}
