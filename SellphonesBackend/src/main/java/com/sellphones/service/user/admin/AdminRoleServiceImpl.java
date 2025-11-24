package com.sellphones.service.user.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.user.admin.*;
import com.sellphones.entity.user.Permission;
import com.sellphones.entity.user.Role;
import com.sellphones.entity.user.RoleName;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.user.PermissionRepository;
import com.sellphones.repository.user.RoleRepository;
import com.sellphones.specification.admin.AdminRoleSpecificationBuilder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminRoleServiceImpl implements AdminRoleService{

    private final RoleRepository roleRepository;

    private final PermissionRepository permissionRepository;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('SETTINGS.ROLES.VIEW')")
    public PageResponse<AdminRoleResponse> getRoles(AdminRoleFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.ASC);
        Sort sort = Sort.by(direction, "id");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Role> spec = AdminRoleSpecificationBuilder.build(request);

        Page<Role> rolePage = roleRepository.findAll(spec, pageable);
        List<Role> promotions = rolePage.getContent();
        List<AdminRoleResponse> response = promotions.stream()
                .map(p -> modelMapper.map(p, AdminRoleResponse.class))
                .toList();

        return PageResponse.<AdminRoleResponse>builder()
                .result(response)
                .total(rolePage.getTotalElements())
                .totalPages(rolePage.getTotalPages())
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('SETTINGS.ROLES.VIEW')")
    public AdminRoleDetailsResponse getRoleDetails(Long id) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        return modelMapper.map(role, AdminRoleDetailsResponse.class);
    }

    @Override
    @PreAuthorize("hasAuthority('SETTINGS.ROLES.CREATE')")
    public AdminRoleResponse createRole(AdminCreateRoleRequest request) {
        Role role = Role.builder()
                .name(request.getName())
                .description(request.getDescription())
                .roleName(RoleName.ADMIN)
                .createdAt(LocalDateTime.now())
                .build();

        Role createdRole = roleRepository.save(role);
        return modelMapper.map(createdRole, AdminRoleResponse.class);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('SETTINGS.ROLES.EDIT')")
    public void editRole(AdminUpdateRoleRequest request, Long id) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        List<Permission> permissions = permissionRepository.findByIdIn(request.getPermissionIds());
        role.setName(request.getName());
        role.setDescription(request.getDescription());
        role.setPermissions(permissions);
    }

    @Override
    @PreAuthorize("hasAuthority('SETTINGS.ROLES.DELETE')")
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }
}
