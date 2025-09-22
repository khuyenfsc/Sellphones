package com.sellphones.repository.user;

import com.sellphones.entity.user.Role;
import com.sellphones.entity.user.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findBYRoleName(RoleName roleName);
}
