package com.sellphones.service.user.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.user.admin.AdminUserFilterRequest;
import com.sellphones.dto.user.admin.AdminUserResponse;
import com.sellphones.dto.user.admin.AdminUserRequest;
import com.sellphones.entity.cart.Cart;
import com.sellphones.entity.user.Role;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.UserMapper;
import com.sellphones.repository.cart.CartRepository;
import com.sellphones.repository.user.RoleRepository;
import com.sellphones.repository.user.UserRepository;
import com.sellphones.service.file.FileStorageService;
import com.sellphones.specification.admin.AdminUserSpecificationBuilder;
import com.sellphones.utils.ImageNameToImageUrlConverter;
import com.sellphones.utils.JsonParser;
import jakarta.transaction.Transactional;
import jakarta.validation.Validator;
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
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminUserServiceImpl implements AdminUserService{

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final CartRepository cartRepository;

    private final UserMapper userMapper;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('SETTINGS.USERS.VIEW')")
    public PageResponse<AdminUserResponse> getUsers(AdminUserFilterRequest request) {
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
    @PreAuthorize("hasAuthority('SETTINGS.USERS.CREATE')")
    public void createUser(AdminUserRequest request) {
        User existingUser = userRepository.findByEmail(request.getEmail()).orElse(null);
        if(existingUser != null){
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }

        Role role = roleRepository.findById(request.getRoleId()).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        User user = userMapper.mapToUserEntity(request, role);
        User savedUser = userRepository.save(user);

        Cart cart = new Cart();
        cart.setUser(savedUser);
        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart);

    }

    @Override
    @PreAuthorize("hasAuthority('SETTINGS.USERS.EDIT')")
    public void editUser(AdminUserRequest request, Long id) {
        User existingUser = userRepository.findByEmail(request.getEmail()).orElse(null);
        if(existingUser != null){
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }

        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        Role role = roleRepository.findById(request.getRoleId()).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        User editedUser = userMapper.mapToUserEntity(request, role);
        editedUser.setId(id);
        editedUser.setCreatedAt(user.getCreatedAt());
        userRepository.save(editedUser);
    }

    @Override
    @PreAuthorize("hasAuthority('SETTINGS.USERS.DELETE')")
    public void deleteUser(Long id) {
        userRepository.deleteById(id);

    }
}
