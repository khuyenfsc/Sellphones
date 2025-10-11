package com.sellphones.specification.admin;

import com.sellphones.dto.inventory.admin.AdminSupplierFilterRequest;
import com.sellphones.entity.inventory.Supplier;
import com.sellphones.entity.inventory.SupplierStatus;
import org.springframework.data.jpa.domain.Specification;

public class AdminSupplierSpecificationBuilder {
    public static Specification<Supplier> build(AdminSupplierFilterRequest request){
        Specification<Supplier> spec = (root, query, cb) -> cb.conjunction();

        if(request.getSupplierStatus() != null){
            spec = spec.and(hasStatus(request.getSupplierStatus()));
        }

        if(request.getName() != null){
            spec = spec.and(hasNameContain(request.getName()));
        }

        if(request.getContactName() != null){
            spec = spec.and(hasContactNameContain(request.getContactName()));
        }

        if(request.getPhoneNumber() != null){
            spec = spec.and(hasPhoneNumberContain(request.getPhoneNumber()));
        }

        if(request.getEmail() != null){
            spec = spec.and(hasEmailContain(request.getEmail()));
        }

        if(request.getTaxCode() != null){
            spec = spec.and(hasTaxCodeContain(request.getTaxCode()));
        }


        return spec;
    }

    public static Specification<Supplier> hasStatus(SupplierStatus status){
        return (root, query, cb) -> cb.equal(root.get("supplierStatus"),  status);
    }

    public static Specification<Supplier> hasNameContain(String name){
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<Supplier> hasContactNameContain(String contactName){
        return (root, query, cb) -> cb.like(cb.lower(root.get("contactName")), "%" + contactName.toLowerCase() + "%");
    }

    public static Specification<Supplier> hasPhoneNumberContain(String phoneNumber){
        return (root, query, cb) -> cb.like(cb.lower(root.get("phoneNumber")), "%" + phoneNumber.toLowerCase() + "%");
    }

    public static Specification<Supplier> hasEmailContain(String email){
        return (root, query, cb) -> cb.like(cb.lower(root.get("email")), "%" + email.toLowerCase() + "%");
    }

    public static Specification<Supplier> hasTaxCodeContain(String taxCode){
        return (root, query, cb) -> cb.like(cb.lower(root.get("taxCode")), "%" + taxCode.toLowerCase() + "%");
    }
}
