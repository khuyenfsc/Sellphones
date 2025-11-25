package com.sellphones.specification.admin;

import com.sellphones.dto.user.admin.AdminUserFilterRequest;
import com.sellphones.entity.user.*;
import org.springframework.data.jpa.domain.Specification;

public class AdminUserSpecificationBuilder {
    public static Specification<User> build(AdminUserFilterRequest request){
        Specification<User> spec = (root, query, cb) -> cb.conjunction();

        if(request.getFullName() != null){
            spec = spec.and(hasFullNameContain(request.getFullName()));
        }

        if(request.getEmail() != null){
            spec = spec.and(hasEmailContain(request.getEmail()));
        }

        if(request.getStatus() != null){
            spec = spec.and(hasStatus(request.getStatus()));
        }

        if(request.getRoleName() != null){
            spec = spec.and(hasRoleName(request.getRoleName()));
        }

        if(request.getGender() != null){
            spec = spec.and(hasGender(request.getGender()));
        }

        if(request.getProvider() != null){
            spec = spec.and(hasProvider(request.getProvider()));
        }

        return spec;
    }

    public static Specification<User> hasFullNameContain(String fullName){
        return (root, query, cb) -> cb.like(cb.lower(root.get("fullName")), "%" + fullName.toLowerCase() + "%");
    }

    public static Specification<User> hasEmailContain(String email){
        return (root, query, cb) -> cb.like(root.get("email"), "%" + email.toLowerCase() + "%");
    }

    public static Specification<User> hasStatus(UserStatus status){
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }

    public static Specification<User> hasRoleName(RoleName roleName){
        return (root, query, cb) -> cb.equal(root.get("roleName"), roleName);
    }

    public static Specification<User> hasGender(Gender gender){
        return (root, query, cb) -> cb.equal(root.get("gender"), gender);
    }

    public static Specification<User> hasProvider(Provider provider){
        return (root, query, cb) -> cb.equal(root.get("provider"), provider);
    }
}
