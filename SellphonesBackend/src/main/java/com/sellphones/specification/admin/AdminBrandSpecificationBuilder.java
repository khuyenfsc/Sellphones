package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminBrand_FilterRequest;
import com.sellphones.entity.product.Brand;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class AdminBrandSpecificationBuilder {
    public static Specification<Brand> build(AdminBrand_FilterRequest request){
        Specification<Brand> spec = (root, query, cb) -> cb.conjunction();

        if(request.getName() != null){
            spec = spec.and(hasNameContains(request.getName()));
        }

        if(request.getStartDate() != null && request.getEndDate() != null){
            spec = spec.and(hasDateBetween(request.getStartDate(), request.getEndDate()));
        }

        return spec;
    }



    public static Specification<Brand> hasNameContains(String keyword){
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%");
    }

    public static Specification<Brand> hasDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.between(root.get("createdAt"), startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
    }
}
