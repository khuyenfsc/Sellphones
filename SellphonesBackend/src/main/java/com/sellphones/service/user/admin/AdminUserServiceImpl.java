package com.sellphones.service.user.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.user.admin.AdminUserFilterRequest;
import com.sellphones.dto.user.admin.AdminUserListResponse;
import com.sellphones.entity.user.User;
import com.sellphones.repository.user.UserRepository;
import com.sellphones.specification.admin.AdminUserSpecificationBuilder;
import com.sellphones.utils.ImageNameToImageUrlConverter;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService{

    private final UserRepository userRepository;

    private final String avatarFolderName = "avatars";

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('SETTINGS.USERS.VIEW')")
    public PageResponse<AdminUserListResponse> getUsers(AdminUserFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "fullName");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<User> spec = AdminUserSpecificationBuilder.build(request);

        Page<User> userPage = userRepository.findAll(spec, pageable);
        List<User> users = userPage.getContent();
        List<AdminUserListResponse> response = users.stream()
                .map(u -> {
                    u.setAvatar(ImageNameToImageUrlConverter.convert(u.getAvatar(), avatarFolderName));
                    return modelMapper.map(u, AdminUserListResponse.class);
                })
                .toList();

        return PageResponse.<AdminUserListResponse>builder()
                .result(response)
                .total(userPage.getTotalElements())
                .totalPages(userPage.getTotalPages())
                .build();
    }
}
