package com.sellphones.service.authentication;

import com.sellphones.dto.user.UserRequest;
import com.sellphones.entity.authentication.AuthenticationToken;
import com.sellphones.entity.user.RoleName;

public interface AuthenticationAction {
    AuthenticationToken authenticate(UserRequest userRequest, RoleName roleName);
}
