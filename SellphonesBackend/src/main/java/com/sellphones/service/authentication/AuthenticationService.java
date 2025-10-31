package com.sellphones.service.authentication;

import com.sellphones.dto.authentication.LogoutRequest;
import com.sellphones.dto.user.BasicUserResponse;
import com.sellphones.dto.user.UserRequest;
import com.sellphones.entity.authentication.AuthenticationToken;
import com.sellphones.entity.user.RoleName;

public interface AuthenticationService {
    AuthenticationToken authenticate(AuthenticationAction authenticationAction, UserRequest userRequest, RoleName roleName);
    AuthenticationToken refreshToken(String refreshToken);
    BasicUserResponse getCurrentUser();
    void logout(LogoutRequest logoutRequest, String refreshToken);
}
