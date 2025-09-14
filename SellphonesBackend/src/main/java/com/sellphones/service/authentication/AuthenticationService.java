package com.sellphones.service.authentication;

import com.nimbusds.jwt.JWTClaimsSet;
import com.sellphones.dto.authentication.request.LogoutRequest;
import com.sellphones.dto.authentication.request.RefreshTokenRequest;
import com.sellphones.dto.authentication.response.AuthenticationResponse;
import com.sellphones.dto.user.UserRequest;

public interface AuthenticationService {
    AuthenticationResponse authenticate(UserRequest userRequest);
    AuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
    void logout(LogoutRequest logoutRequest);
    JWTClaimsSet validateToken(String token);
}
