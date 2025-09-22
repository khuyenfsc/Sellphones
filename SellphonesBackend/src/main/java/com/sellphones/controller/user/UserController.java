package com.sellphones.controller.user;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.authentication.response.AuthenticationResponse;
import com.sellphones.dto.user.*;
import com.sellphones.entity.authentication.AuthenticationToken;
import com.sellphones.service.authentication.AuthenticationService;
import com.sellphones.service.authentication.GoogleAuthenticationAction;
import com.sellphones.service.user.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final AuthenticationService authenticationService;

    private final GoogleAuthenticationAction googleAuthenticationAction;

    @GetMapping("/user-profile-basic")
    public ResponseEntity<CommonResponse> getUserProfileBasic(){
        BasicUserResponse userResponse = userService.getUserProfileBasic();
        Map<String, Object> map = new HashMap<>();
        map.put("basic_user", userResponse);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @GetMapping("/profile")
    public ResponseEntity<CommonResponse> getUserProfile(){
        UserProfileResponse userProfileResponse = userService.getUserProfile();
        Map<String, Object> map = new HashMap<>();
        map.put("result", userProfileResponse);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/update-profile")
    public ResponseEntity<CommonResponse> updateProfile(@RequestBody @Valid UpdatedInfoRequest updatedInfoRequest){
        userService.updateProfile(updatedInfoRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated info successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/change-password")
    public ResponseEntity<CommonResponse> changePassword(@RequestBody @Valid ChangePasswordRequest changePasswordRequest){
        userService.changePassword(changePasswordRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Changed password successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/register")
    public ResponseEntity<CommonResponse> verifyUser(@RequestBody @Valid UserRegisterRequest userRegisterRequest){
        ActiveProfileResponse activeProfileResponse = userService.verifyUser(userRegisterRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", activeProfileResponse);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/send-register-otp")
    public ResponseEntity<CommonResponse> sendRegisterOtp(@RequestBody @Valid RegisterOtpSendingRequest registerOtpSendingRequest){
        userService.sendRegisterOtp(registerOtpSendingRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Sent otp successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/verify-register-otp")
    public ResponseEntity<CommonResponse> verifyRegisterOtp(@RequestBody @Valid RegisterOtpRequest registerOtpRequest){
        userService.verifyRegisterOtp(registerOtpRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Registered user successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

//    @PostMapping("/check-existing-user")
//    public ResponseEntity<CommonResponse> checkExistingUser(@RequestBody ResetPasswordRequest resetPasswordRequest){
//        userService.checkExistingUser(resetPasswordRequest);
//        Map<String, Object> map = new HashMap<>();
//        map.put("result", "Validated user successfully");
//
//        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
//    }

    @PostMapping("/send-forgot-password-otp")
    public ResponseEntity<CommonResponse> sendForgotPasswordOtp(@RequestBody @Valid SendForgotPasswordOtpRequest sendForgotPasswordOtpRequest) {
        userService.sendForgotPasswordOtp(sendForgotPasswordOtpRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Sent otp successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/verify-forgot-password-otp")
    public ResponseEntity<CommonResponse> verifyForgotPasswordOtp(@RequestBody @Valid ForgotPasswordOtpRequest forgotPasswordOtpRequest) {
        ResetPasswordTokenResponse response = userService.verifyForgotPasswordOtp(forgotPasswordOtpRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("token", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<CommonResponse> resetPassword(@RequestBody @Valid ResetPasswordRequest resetPasswordRequest) {
        userService.resetPassword(resetPasswordRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Reset password successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/register-with-google")
    public ResponseEntity<CommonResponse> registerWithGoogle(@RequestBody @Valid GoogleRegisterRequest request, HttpServletResponse response){
        AuthenticationToken authenticationToken = userService.registerWithGoogle(request);

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

    @PostMapping("/test-create-user")
    public ResponseEntity<CommonResponse> testCreateUser(@RequestBody @Valid UserRegisterRequest userRegisterRequest){
        userService.testCreateUser(userRegisterRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Registered user successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }


}
