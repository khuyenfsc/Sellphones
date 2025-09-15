package com.sellphones.service.user;

import com.nimbusds.jwt.JWTClaimsSet;
import com.sellphones.dto.user.BasicUserResponse;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.user.UserRepository;
import com.sellphones.service.authentication.AuthenticationService;
import com.sellphones.utils.SecurityUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final AuthenticationService authenticationService;

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    @Override
    @Cacheable(value = "user_profile_basic", key = "#root.methodName + '_' + T(org.springframework.security.core.context.SecurityContextHolder).getContext().getAuthentication().getName()")
    public BasicUserResponse getUserProfileBasic(){
        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return modelMapper.map(user, BasicUserResponse.class);
    }

}
