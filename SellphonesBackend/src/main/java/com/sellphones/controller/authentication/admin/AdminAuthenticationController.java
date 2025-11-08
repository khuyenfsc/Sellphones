package com.sellphones.controller.authentication.admin;

import com.sellphones.constant.AppConstants;
import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.authentication.AuthenticationResponse;
import com.sellphones.dto.authentication.LogoutRequest;
import com.sellphones.dto.user.BasicUserResponse;
import com.sellphones.dto.user.UserRequest;
import com.sellphones.entity.authentication.AuthenticationToken;
import com.sellphones.entity.user.RoleName;
import com.sellphones.service.authentication.AuthenticationService;
import com.sellphones.service.authentication.LocalAuthenticationAction;
import com.sellphones.utils.SecurityUtils;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/auth")
@RequiredArgsConstructor
public class AdminAuthenticationController {

    private final AuthenticationService authenticationService;

    private final LocalAuthenticationAction localAuthenticationAction;

    @PostMapping("/login")
    public ResponseEntity<CommonResponse> adminLogin(@RequestBody UserRequest userRequest, HttpServletResponse response){
        AuthenticationToken authenticationToken = authenticationService.authenticate(localAuthenticationAction, userRequest, RoleName.ADMIN);
        SecurityUtils.setRefreshTokenToCookie(response, authenticationToken.getRefreshToken(), AppConstants.ADMIN_REFRESH_TOKEN_NAME);

        Map<String, Object> map = new HashMap<>();
        map.put("result", new AuthenticationResponse(authenticationToken.getAccessToken()));
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PostMapping("/refresh")
    public ResponseEntity<CommonResponse> adminRefreshToken(@CookieValue(AppConstants.ADMIN_REFRESH_TOKEN_NAME) String refreshToken, HttpServletResponse response) {
        AuthenticationToken authenticationToken = authenticationService.refreshToken(refreshToken);
        SecurityUtils.setRefreshTokenToCookie(response, authenticationToken.getRefreshToken(), AppConstants.ADMIN_REFRESH_TOKEN_NAME);

        Map<String, Object> map = new HashMap<>();
        map.put("result", new AuthenticationResponse(authenticationToken.getAccessToken()));
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @GetMapping("/me")
    public ResponseEntity<CommonResponse> getCurrentUser(){
        BasicUserResponse userResponse = authenticationService.getCurrentUser();
        Map<String, Object> map = new HashMap<>();
        map.put("result", userResponse);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PostMapping("/logout")
    public ResponseEntity<CommonResponse> adminLogout(@RequestBody LogoutRequest logoutRequest, @CookieValue(AppConstants.ADMIN_REFRESH_TOKEN_NAME) String refreshToken, HttpServletResponse response) {
        authenticationService.logout(logoutRequest, refreshToken);
        SecurityUtils.setRefreshTokenToCookie(response, "", AppConstants.ADMIN_REFRESH_TOKEN_NAME);

        Map<String, Object> map = new HashMap<>();
        map.put("result", "Logged out!");
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

}
