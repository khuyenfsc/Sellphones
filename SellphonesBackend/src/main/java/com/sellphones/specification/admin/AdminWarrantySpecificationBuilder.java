package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminWarrantyFilterRequest;
import com.sellphones.entity.product.Warranty;
import org.springframework.data.jpa.domain.Specification;

public class AdminWarrantySpecificationBuilder {
    public static Specification<Warranty> build(AdminWarrantyFilterRequest request){
        Specification<Warranty> spec = (root, query, cb) -> cb.conjunction();

        if(request.getName() != null){
            spec = spec.and(hasNameContain(request.getName()));
        }

        if(request.getMonths() != null){
            spec = spec.and(hasMonths(request.getMonths()));
        }

        if(request.getMinPrice() != null && request.getMaxPrice() != null){
            spec = spec.and(priceBetween(request.getMinPrice(), request.getMaxPrice()));
        }

        return spec;
    }

    public static Specification<Warranty> hasNameContain(String name){
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<Warranty> hasMonths(Integer months){
        return (root, query, cb) -> cb.equal(root.get("months"), months);
    }

    public static Specification<Warranty> priceBetween(Long minPrice, Long maxPrice){
        return (root, query, cb) -> cb.between(root.get("price"), minPrice, maxPrice);
    }
}
