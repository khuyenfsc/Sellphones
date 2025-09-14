package com.sellphones.service.authentication;

import com.nimbusds.jwt.JWTClaimsSet;
import com.sellphones.dto.authentication.request.LogoutRequest;
import com.sellphones.dto.authentication.request.RefreshTokenRequest;
import com.sellphones.dto.authentication.response.AuthenticationResponse;
import com.sellphones.dto.user.UserRequest;
import com.sellphones.entity.authentication.AuthenticationToken;

public interface AuthenticationService {
    AuthenticationToken authenticate(UserRequest userRequest);
    AuthenticationToken refreshToken(String refreshToken);
    void logout(LogoutRequest logoutRequest, String refreshToken);
    JWTClaimsSet validateToken(String token);
}
