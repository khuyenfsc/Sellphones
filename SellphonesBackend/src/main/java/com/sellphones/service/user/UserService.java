package com.sellphones.service.user;

import com.sellphones.dto.user.*;
import com.sellphones.entity.authentication.AuthenticationToken;

public interface UserService {
    BasicUserResponse getUserProfileBasic();

    UserProfileResponse getUserProfile();

    UserProfileResponse updateProfile(UpdatedInfoRequest updatedInfoRequest);

    void changePassword(ChangePasswordRequest changePasswordRequest);

    ActiveProfileResponse verifyUser(UserRegisterRequest userRegisterRequest);

    void sendRegisterOtp(RegisterOtpSendingRequest registerOtpSendingRequest);

    void verifyRegisterOtp(RegisterOtpRequest registerOtpRequest);

    void testCreateUser(UserRegisterRequest userRegisterRequest);

    void sendForgotPasswordOtp(SendForgotPasswordOtpRequest sendForgotPasswordOtpRequest);

    ResetPasswordTokenResponse verifyForgotPasswordOtp(ForgotPasswordOtpRequest forgotPasswordOtpRequest);

    void resetPassword(ResetPasswordRequest resetPasswordRequest);

    AuthenticationToken registerWithGoogle(GoogleRegisterRequest request);

//    void checkExistingUser(ResetPasswordRequest resetPasswordRequest);

}
