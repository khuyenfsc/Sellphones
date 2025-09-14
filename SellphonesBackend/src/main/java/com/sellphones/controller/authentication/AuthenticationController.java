package com.sellphones.controller.authentication;

import com.nimbusds.jose.JOSEException;
import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.authentication.request.LogoutRequest;
import com.sellphones.dto.authentication.request.RefreshTokenRequest;
import com.sellphones.dto.authentication.response.AuthenticationResponse;
import com.sellphones.dto.user.UserRequest;
import com.sellphones.service.authentication.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<CommonResponse> login(@RequestBody UserRequest userRequest){
        AuthenticationResponse authenticationResponse = authenticationService.authenticate(userRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", authenticationResponse);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/refresh")
    public ResponseEntity<CommonResponse> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        AuthenticationResponse authenticationResponse = authenticationService.refreshToken(refreshTokenRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", authenticationResponse);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/logout")
    public ResponseEntity<CommonResponse> logout(@RequestBody LogoutRequest logoutRequest) {
        authenticationService.logout(logoutRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Logged out!");
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
