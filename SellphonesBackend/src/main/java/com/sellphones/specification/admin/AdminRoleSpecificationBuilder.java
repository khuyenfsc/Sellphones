package com.sellphones.specification.admin;
import com.sellphones.dto.user.admin.AdminRoleFilterRequest;
import com.sellphones.entity.user.Role;
import com.sellphones.entity.user.RoleName;
import org.springframework.data.jpa.domain.Specification;

public class AdminRoleSpecificationBuilder {
    public static Specification<Role> build(AdminRoleFilterRequest request){
        Specification<Role> spec = (root, query, cb) -> cb.conjunction();

        if(request.getName() != null){
            spec = spec.and(hasNameContain(request.getName()));
        }

        if(request.getRoleName() != null){
            spec = spec.and(hasRoleName(request.getRoleName()));
        }

        return spec;
    }

    public static Specification<Role> hasNameContain(String name){
        return (root, query, cb) -> cb.like(root.get("name"), "%" + name + "%");
    }

    public static Specification<Role> hasRoleName(RoleName roleName){
        return (root, query, cb) -> cb.equal(root.get("roleName"), roleName);
    }
}
