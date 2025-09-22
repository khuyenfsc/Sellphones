package com.sellphones.controller.authentication;

import com.nimbusds.jose.JOSEException;
import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.authentication.request.LogoutRequest;
import com.sellphones.dto.authentication.request.RefreshTokenRequest;
import com.sellphones.dto.authentication.response.AuthenticationResponse;
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
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    private final LocalAuthenticationAction localAuthenticationAction;

    @PostMapping("/login")
    public ResponseEntity<CommonResponse> login(@RequestBody UserRequest userRequest, HttpServletResponse response){
        AuthenticationToken authenticationToken = authenticationService.authenticate(localAuthenticationAction, userRequest, RoleName.CUSTOMER);
        SecurityUtils.setRefreshTokenToCookie(response, authenticationToken.getRefreshToken());
        Map<String, Object> map = new HashMap<>();

        map.put("result", new AuthenticationResponse(authenticationToken.getAccessToken()));
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/admin-login")
    public ResponseEntity<CommonResponse> adminLogin(@RequestBody UserRequest userRequest, HttpServletResponse response){
        AuthenticationToken authenticationToken = authenticationService.authenticate(localAuthenticationAction, userRequest, RoleName.ADMIN);
        SecurityUtils.setRefreshTokenToCookie(response, authenticationToken.getRefreshToken());

        Map<String, Object> map = new HashMap<>();
        map.put("result", new AuthenticationResponse(authenticationToken.getAccessToken()));
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/refresh")
    public ResponseEntity<CommonResponse> refreshToken(@CookieValue("refreshToken") String refreshToken, HttpServletResponse response) {
        AuthenticationToken authenticationToken = authenticationService.refreshToken(refreshToken);
        SecurityUtils.setRefreshTokenToCookie(response, authenticationToken.getRefreshToken());

        Map<String, Object> map = new HashMap<>();
        map.put("result", new AuthenticationResponse(authenticationToken.getAccessToken()));
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/logout")
    public ResponseEntity<CommonResponse> logout(@RequestBody LogoutRequest logoutRequest, @CookieValue("refreshToken") String refreshToken, HttpServletResponse response) {
        authenticationService.logout(logoutRequest, refreshToken);
        SecurityUtils.setRefreshTokenToCookie(response, "");

        Map<String, Object> map = new HashMap<>();
        map.put("result", "Logged out!");
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
