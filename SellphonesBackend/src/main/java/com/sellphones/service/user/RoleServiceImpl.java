package com.sellphones.service.user;

import com.sellphones.entity.user.Permission;
import com.sellphones.entity.user.Role;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.user.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    @Cacheable(value = "rolePermissionsCache", key = "#id")
    public Set<String> getPermissionByRoleId(Long id) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        return role.getPermissions().stream()
                .map(Permission::getCode)
                .collect(Collectors.toSet());
    }
}
