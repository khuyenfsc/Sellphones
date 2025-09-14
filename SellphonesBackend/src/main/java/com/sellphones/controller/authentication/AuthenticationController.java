package com.sellphones.controller.authentication;

import com.nimbusds.jose.JOSEException;
import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.authentication.request.LogoutRequest;
import com.sellphones.dto.authentication.request.RefreshTokenRequest;
import com.sellphones.dto.authentication.response.AuthenticationResponse;
import com.sellphones.dto.user.UserRequest;
import com.sellphones.entity.authentication.AuthenticationToken;
import com.sellphones.service.authentication.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<CommonResponse> login(@RequestBody UserRequest userRequest, HttpServletResponse response){
        AuthenticationToken authenticationToken = authenticationService.authenticate(userRequest);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", authenticationToken.getRefreshToken())
                .httpOnly(true)
                .domain("localhost")
                .maxAge(Duration.ofDays(14))
                .sameSite("strict")
                .secure(false)
                .path("/")
                .build();
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        Map<String, Object> map = new HashMap<>();
        map.put("result", new AuthenticationResponse(authenticationToken.getAccessToken()));
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/refresh")
    public ResponseEntity<CommonResponse> refreshToken(@CookieValue("refreshToken") String refreshToken, HttpServletResponse response) {
        AuthenticationToken authenticationToken = authenticationService.refreshToken(refreshToken);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", authenticationToken.getRefreshToken())
                .httpOnly(true)
                .domain("localhost")
                .maxAge(Duration.ofDays(14))
                .sameSite("Strict")
                .secure(false)
                .path("/")
                .build();
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        Map<String, Object> map = new HashMap<>();
        map.put("result", new AuthenticationResponse(authenticationToken.getAccessToken()));
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/logout")
    public ResponseEntity<CommonResponse> logout(@RequestBody LogoutRequest logoutRequest, @CookieValue("refreshToken") String refreshToken, HttpServletResponse response) {
        authenticationService.logout(logoutRequest, refreshToken);

        ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(false)
                .domain("localhost")
                .path("/")
                .sameSite("Strict")
                .maxAge(0)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());

        Map<String, Object> map = new HashMap<>();
        map.put("result", "Logged out!");
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
