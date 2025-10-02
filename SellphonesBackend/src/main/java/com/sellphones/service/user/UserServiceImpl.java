package com.sellphones.service.user;

import com.sellphones.dto.user.*;
import com.sellphones.entity.authentication.AuthenticationToken;
import com.sellphones.entity.user.Provider;
import com.sellphones.entity.user.Role;
import com.sellphones.entity.user.RoleName;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.redis.Otp;
import com.sellphones.redis.RedisAuthService;
import com.sellphones.redis.RedisOtpService;
import com.sellphones.redis.RedisUserService;
import com.sellphones.repository.user.RoleRepository;
import com.sellphones.repository.user.UserRepository;
import com.sellphones.service.authentication.AuthenticationService;
import com.sellphones.service.authentication.GoogleAuthenticationAction;
import com.sellphones.service.email.EmailService;
import com.sellphones.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final RedisOtpService redisOtpService;

    private final RedisUserService redisUserService;

    private final RedisAuthService redisAuthService;

    private final AuthenticationService authenticationService;

    private final GoogleAuthenticationAction googleAuthenticationAction;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final EmailService emailService;

    private final PasswordEncoder passwordEncoder;

    private final ModelMapper modelMapper;

    @Override
    @Cacheable(value = "user_profile_basic", key = "#root.methodName + '_' + T(org.springframework.security.core.context.SecurityContextHolder).getContext().getAuthentication().getName()")
    public BasicUserResponse getUserProfileBasic(){
        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return modelMapper.map(user, BasicUserResponse.class);
    }

    @Override
    public UserProfileResponse getUserProfile() {
        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return modelMapper.map(user, UserProfileResponse.class);
    }

    @Override
    @Transactional
    public void updateProfile(UpdatedInfoRequest updatedInfoRequest) {
        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        user.setFullName(updatedInfoRequest.getFullName());
        user.setDateOfBirth(updatedInfoRequest.getDateOfBirth());
        user.setGender(updatedInfoRequest.getGender());
    }

    @Override
    @Transactional
    public void changePassword(ChangePasswordRequest changePasswordRequest) {
        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        if(!passwordEncoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())){
            throw new AppException(ErrorCode.INVALID_PASSWORD);
        }

        user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
    }

    @Override
    public void sendRegisterOtp(RegisterOtpSendingRequest registerOtpSendingRequest) {
        Otp otp = redisOtpService.getRegisterOtp(registerOtpSendingRequest.getEmail());
        if (otp != null) {
            long secondsPassed = Duration.between(otp.getCreatedAt(), Instant.now()).toSeconds();
            if (secondsPassed < 60) {
                throw new AppException(ErrorCode.TIME_LIMIT_NOT_REACHED);
            }
        }

        User user = redisUserService.getUser(registerOtpSendingRequest.getActiveToken());
        if(user == null){
            throw new AppException(ErrorCode.INVALID_ACTIVE_TOKEN);
        }

        String generatedOtp = generateOtp();
        String subject = "Your OTP Code for Account Registration";
        StringBuilder content = new StringBuilder();
        content.append("<html>")
                .append("<body style='font-family: Arial, sans-serif; line-height: 1.6; background-color:#f9f9f9; padding:20px;'>")
                .append("<div style='max-width:600px; margin:auto; background:#ffffff; border-radius:8px; padding:20px; box-shadow:0 2px 8px rgba(0,0,0,0.1);'>")

                // Logo hoặc tên thương hiệu
                .append("<h2 style='color:#007BFF; text-align:center;'>Sellphones</h2>")
                .append("<hr style='border:0; height:1px; background:#e0e0e0; margin:20px 0;'/>")

                // Lời chào
                .append("<p>Dear <strong>")
                .append(registerOtpSendingRequest.getEmail())
                .append("</strong>,</p>")

                // Nội dung chính
                .append("<p>Thank you for choosing <strong>Sellphones</strong>, your trusted store for the latest electronics and smartphones.</p>")
                .append("<p style='font-size: 18px;'><strong>Your OTP Code is:</strong></p>")
                .append("<div style='text-align:center; margin:20px 0;'>")
                .append("<span style='display:inline-block; font-size:28px; color:#FF5733; font-weight:bold; letter-spacing:4px; padding:10px 20px; border:2px dashed #FF5733; border-radius:6px;'>")
                .append(generatedOtp)
                .append("</span>")
                .append("</div>")

                // Ghi chú bảo mật
                .append("<p><strong>Note:</strong> This OTP is valid for <em>5 minutes</em>. Please enter it as soon as possible to complete your verification.</p>")
                .append("<p>If you did not request this code, please ignore this email. For your security, do not share this code with anyone.</p>")

                // Chữ ký
                .append("<br/>")
                .append("<p>Best regards,</p>")
                .append("<p><strong>Sellphones Support Team</strong></p>")

                .append("</div>")
                .append("</body>")
                .append("</html>");

        emailService.sandEmail(subject, content.toString(), registerOtpSendingRequest.getEmail());

        redisOtpService.saveRegisterOtp(registerOtpSendingRequest.getEmail(), new Otp(generatedOtp, Instant.now()), Duration.ofMinutes(5));
    }

    @Override
    public ActiveProfileResponse verifyUser(UserRegisterRequest userRegisterRequest) {
        Role role = getCustomerRole();
        User user = userRepository.findByEmail(userRegisterRequest.getEmail()).orElse(null);
        if(user != null){
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }

        user = User.builder()
                .fullName(userRegisterRequest.getFullName())
                .email(userRegisterRequest.getEmail())
                .password(passwordEncoder.encode(userRegisterRequest.getPassword()))
                .dateOfBirth(userRegisterRequest.getDateOfBirth())
                .phoneNumber(userRegisterRequest.getPhoneNumber())
                .role(role)
                .gender(userRegisterRequest.getGender())
                .build();

        String activeToken = Base64.getUrlEncoder().withoutPadding()
                .encodeToString(UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8));
        redisUserService.saveUser(activeToken, user, Duration.ofMinutes(15));

        return new ActiveProfileResponse(activeToken, userRegisterRequest.getEmail());
    }

    @Override
    public void verifyRegisterOtp(RegisterOtpRequest registerOtpRequest) {
        Otp otp = redisOtpService.getRegisterOtp(registerOtpRequest.getEmail());
        if(!otp.getOtp().equals(registerOtpRequest.getOtp())){
            throw new AppException(ErrorCode.INVALID_OTP);
        }

        User user = redisUserService.getUser(registerOtpRequest.getActiveToken());
        userRepository.save(user);

        redisUserService.deleteUser(registerOtpRequest.getActiveToken());
        redisOtpService.deleteRegisterOtp(registerOtpRequest.getEmail());
    }

    @Override
    public void testCreateUser(UserRegisterRequest userRegisterRequest) {
        Role role = getCustomerRole();
        User user = User.builder()
                .fullName(userRegisterRequest.getFullName())
                .email(userRegisterRequest.getEmail())
                .password(passwordEncoder.encode(userRegisterRequest.getPassword()))
                .dateOfBirth(userRegisterRequest.getDateOfBirth())
                .phoneNumber(userRegisterRequest.getPhoneNumber())
                .role(role)
                .gender(userRegisterRequest.getGender())
                .build();
        userRepository.save(user);
    }

//    @Override
//    public void checkExistingUser(ResetPasswordRequest resetPasswordRequest) {
//        User user = userRepository.findByEmail(resetPasswordRequest.getEmail()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
//    }

    @Override
    public void sendForgotPasswordOtp(SendForgotPasswordOtpRequest sendForgotPasswordOtpRequest) {
        Otp otp = redisOtpService.getForgotPasswordOtp(sendForgotPasswordOtpRequest.getEmail());
        if (otp != null) {
            long secondsPassed = Duration.between(otp.getCreatedAt(), Instant.now()).toSeconds();
            if (secondsPassed < 60) {
                throw new AppException(ErrorCode.TIME_LIMIT_NOT_REACHED);
            }
        }

        User user = userRepository.findByEmail(sendForgotPasswordOtpRequest.getEmail()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        String generatedOtp = generateOtp();

        String subject = "Your OTP Code for Password Reset";
        StringBuilder content = new StringBuilder();
        content.append("<html>")
                .append("<body style='font-family: Arial, sans-serif; line-height: 1.6; background-color:#f9f9f9; padding:20px;'>")
                .append("<div style='max-width:600px; margin:auto; background:#ffffff; border-radius:8px; padding:20px; box-shadow:0 2px 8px rgba(0,0,0,0.1);'>")

                // Logo hoặc tên thương hiệu
                .append("<h2 style='color:#007BFF; text-align:center;'>Sellphones</h2>")
                .append("<hr style='border:0; height:1px; background:#e0e0e0; margin:20px 0;'/>")

                // Lời chào
                .append("<p>Dear <strong>")
                .append(sendForgotPasswordOtpRequest.getEmail()) // hoặc otpSendingRequest.getEmail()
                .append("</strong>,</p>")

                // Nội dung chính
                .append("<p>We received a request to reset the password for your <strong>Sellphones</strong> account.</p>")
                .append("<p style='font-size: 18px;'><strong>Your OTP Code for password reset is:</strong></p>")
                .append("<div style='text-align:center; margin:20px 0;'>")
                .append("<span style='display:inline-block; font-size:28px; color:#FF5733; font-weight:bold; letter-spacing:4px; padding:10px 20px; border:2px dashed #FF5733; border-radius:6px;'>")
                .append(generatedOtp)
                .append("</span>")
                .append("</div>")

                // Ghi chú bảo mật
                .append("<p><strong>Note:</strong> This OTP is valid for <em>5 minutes</em>. Please use it promptly to reset your password.</p>")
                .append("<p>If you did not request a password reset, please ignore this email. For your security, do not share this code with anyone.</p>")

                // Chữ ký
                .append("<br/>")
                .append("<p>Best regards,</p>")
                .append("<p><strong>Sellphones Support Team</strong></p>")

                .append("</div>")
                .append("</body>")
                .append("</html>");
        emailService.sandEmail(subject, content.toString(), sendForgotPasswordOtpRequest.getEmail());

        redisOtpService.saveForgotPasswordOtp(sendForgotPasswordOtpRequest.getEmail(), new Otp(generatedOtp, Instant.now()), Duration.ofMinutes(5));
    }

    @Override
    public ResetPasswordTokenResponse verifyForgotPasswordOtp(ForgotPasswordOtpRequest forgotPasswordOtpRequest) {
        Otp otp = redisOtpService.getForgotPasswordOtp(forgotPasswordOtpRequest.getEmail());
        if(!otp.getOtp().equals(forgotPasswordOtpRequest.getOtp())){
            throw new AppException(ErrorCode.INVALID_OTP);
        }

        redisOtpService.deleteForgotPasswordOtp(forgotPasswordOtpRequest.getEmail());
        String resetToken = Base64.getUrlEncoder().withoutPadding()
                .encodeToString(UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8));
        redisAuthService.saveResetPasswordEmail(resetToken, forgotPasswordOtpRequest.getEmail(), Duration.ofMinutes(5));
        return new ResetPasswordTokenResponse(resetToken);
    }

    @Override
    @Transactional
    public void resetPassword(ResetPasswordRequest resetPasswordRequest) {
        String email = redisAuthService.getResetPasswordEmail(resetPasswordRequest.getToken());

        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        user.setPassword(passwordEncoder.encode(resetPasswordRequest.getNewPassword()));

        redisAuthService.deleteResetPasswordEmail(resetPasswordRequest.getToken());
    }

    @Override
    public AuthenticationToken registerWithGoogle(GoogleRegisterRequest request) {
        String email = redisAuthService.getRegisterEmail(request.getActiveToken());
        Role role = getCustomerRole();
        User user = User.builder()
                .fullName(request.getFullName())
                .email(email)
                .dateOfBirth(request.getDateOfBirth())
                .phoneNumber(request.getPhoneNumber())
                .gender(request.getGender())
                .role(role)
                .provider(Provider.GOOGLE)
                .createdAt(LocalDateTime.now())
                .build();
        userRepository.save(user);
        redisAuthService.deleteRegisterEmail(email);
        return authenticationService.authenticate(googleAuthenticationAction, new UserRequest(email, null), RoleName.CUSTOMER);
    }

    private Role getCustomerRole(){
        return roleRepository.findByRoleName(RoleName.CUSTOMER).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
    }

    private String generateOtp(){
        Random random = new Random();
        String otp = "";
        for(int i = 0; i < 6; i++){
            otp += String.valueOf(random.nextInt(10));
        }

        return otp;
    }

}
