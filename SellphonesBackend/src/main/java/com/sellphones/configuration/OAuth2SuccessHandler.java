package com.sellphones.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.dto.authentication.response.AuthenticationResponse;
import com.sellphones.dto.user.UserRequest;
import com.sellphones.entity.authentication.AuthenticationToken;
import com.sellphones.entity.user.RoleName;
import com.sellphones.entity.user.User;
import com.sellphones.oauth2.CustomOAuth2User;
import com.sellphones.oauth2.CustomOAuth2UserService;
import com.sellphones.redis.RedisAuthService;
import com.sellphones.repository.user.UserRepository;
import com.sellphones.service.authentication.AuthenticationService;
import com.sellphones.service.authentication.GoogleAuthenticationAction;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Base64;
import java.util.Map;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final AuthenticationService authenticationService;

    private final GoogleAuthenticationAction googleAuthenticationAction;

    private final UserRepository userRepository;

    private final RedisAuthService redisAuthService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        String email = attributes.get("email").toString();
        User user = userRepository.findByEmail(email).orElse(null);
        if(user != null){
            AuthenticationToken authenticationToken = authenticationService.authenticate(googleAuthenticationAction, new UserRequest(attributes.get("email").toString(), null), RoleName.CUSTOMER);
            ResponseCookie cookie = ResponseCookie.from("refreshToken", authenticationToken.getRefreshToken())
                    .httpOnly(true)
                    .domain("localhost")
                    .maxAge(Duration.ofDays(14))
                    .sameSite("strict")
                    .secure(false)
                    .path("/")
                    .build();
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json;charset=UTF-8");
            response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            //Đổi thành url front end ví dụ:  response.sendRedirect("http://localhost:3000/oauth2/success");
            response.sendRedirect("http://localhost:3000/oauth2/success");
        }else{
            String name = attributes.get("name").toString();
            String activeToken = Base64.getUrlEncoder().withoutPadding()
                    .encodeToString(UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8));
            String encodedEmail = URLEncoder.encode(email, StandardCharsets.UTF_8);
            String encodedName = URLEncoder.encode(name, StandardCharsets.UTF_8);
            redisAuthService.saveRegisterEmail(activeToken, email, Duration.ofMinutes(10));
            response.sendRedirect("http://localhost:3000/oauth2/complete-register?email="
                    + encodedEmail + "&activeToken=" + activeToken + "&name=" + encodedName);
        }
    }
}
