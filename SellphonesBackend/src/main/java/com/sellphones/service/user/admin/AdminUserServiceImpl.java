package com.sellphones.service.user.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.user.admin.AdminUpdateUserRequest;
import com.sellphones.dto.user.admin.AdminUser_FilterRequest;
import com.sellphones.dto.user.admin.AdminUserResponse;
import com.sellphones.dto.user.admin.AdminCreateUserRequest;
import com.sellphones.entity.cart.Cart;
import com.sellphones.entity.user.Role;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.UserMapper;
import com.sellphones.redis.RedisAuthService;
import com.sellphones.repository.cart.CartRepository;
import com.sellphones.repository.user.RoleRepository;
import com.sellphones.repository.user.UserRepository;
import com.sellphones.specification.admin.AdminUserSpecificationBuilder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminUserServiceImpl implements AdminUserService{

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final CartRepository cartRepository;

    private final RedisAuthService redisAuthService;

    private final UserMapper userMapper;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('SETTINGS.USERS')")
    public PageResponse<AdminUserResponse> getUsers(AdminUser_FilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "fullName");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<User> spec = AdminUserSpecificationBuilder.build(request);

        Page<User> userPage = userRepository.findAll(spec, pageable);
        List<User> users = userPage.getContent();
        List<AdminUserResponse> response = users.stream()
                .map(u -> modelMapper.map(u, AdminUserResponse.class))
                .toList();

        return PageResponse.<AdminUserResponse>builder()
                .result(response)
                .total(userPage.getTotalElements())
                .totalPages(userPage.getTotalPages())
                .build();
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('SETTINGS.USERS')")
    public void createUser(AdminCreateUserRequest request) {
        User existingUser = userRepository.findByEmail(request.getEmail()).orElse(null);
        if(existingUser != null){
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }

        Role role = roleRepository.findById(request.getRoleId()).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        User user = userMapper.mapCreatedToUserEntity(request, role);
        User savedUser = userRepository.save(user);

        Cart cart = new Cart();
        cart.setUser(savedUser);
        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart);

    }

    @Override
    @PreAuthorize("hasAuthority('SETTINGS.USERS')")
    public void updateUser(AdminUpdateUserRequest request, Long id) {
//        User existingUser = userRepository.findByEmail(request.getEmail()).orElse(null);
//        if(existingUser != null){
//            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
//        }

        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        userRepository.findByEmail(request.getEmail())
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
                });

        Role role = roleRepository.findById(request.getRoleId()).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        Date mockExpiration = new Date(0); // 1970-01-01T00:00:00Z
        if(user.getJid() == null){
            throw new AppException(ErrorCode.NEED_RELOGIN);
        }
        redisAuthService.saveJwtExpirationTime(
                user.getJid(),
                mockExpiration,
                Duration.ofMinutes(15)
        );

        user = userMapper.mapToEditedUserEntity(user, request, role);
        userRepository.save(user);
    }

    @Override
    @PreAuthorize("hasAuthority('SETTINGS.USERS')")
    public void deleteUser(Long id) {
        userRepository.deleteById(id);

    }
}
