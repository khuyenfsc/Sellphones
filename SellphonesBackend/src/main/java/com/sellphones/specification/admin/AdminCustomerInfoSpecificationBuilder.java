package com.sellphones.specification.admin;

import com.sellphones.dto.customer.admin.AdminCustomerInfoFilterRequest;
import com.sellphones.entity.customer.CustomerInfo;
import org.springframework.data.jpa.domain.Specification;


public class AdminCustomerInfoSpecificationBuilder {
    public static Specification<CustomerInfo> build(AdminCustomerInfoFilterRequest request){
        Specification<CustomerInfo> spec = (root, query, cb) -> cb.conjunction();

        if(request.getEmail() != null){
            spec = spec.and(hasEmailContain(request.getEmail()));
        }

        if(request.getName() != null){
            spec = spec.and(hasNameContain(request.getName()));
        }

        if(request.getPhoneNumber() != null){
            spec = spec.and(hasPhoneNumberContain(request.getPhoneNumber()));
        }

        if(request.getCccd() != null){
            spec = spec.and(hasCccdContain(request.getCccd()));
        }

        return spec;
    }

    public static Specification<CustomerInfo> hasEmailContain(String email){
        return (root, query, cb) -> cb.like(cb.lower(root.get("user").get("email")), "%" + email.toLowerCase() + "%");
    }

    public static Specification<CustomerInfo> hasNameContain(String name){
        return (root, query, cb) -> cb.like(cb.lower(root.get("fullName")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<CustomerInfo> hasPhoneNumberContain(String phoneNumber){
        return (root, query, cb) -> cb.like(cb.lower(root.get("phoneNumber")), "%" + phoneNumber.toLowerCase() + "%");
    }

    public static Specification<CustomerInfo> hasCccdContain(String cccd){
        return (root, query, cb) -> cb.like(cb.lower(root.get("cccd")), "%" + cccd.toLowerCase() + "%");
    }

}
