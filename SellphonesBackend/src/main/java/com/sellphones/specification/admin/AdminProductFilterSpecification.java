package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminAttributeFilterRequest;
import com.sellphones.dto.product.admin.AdminProductFilterFilterRequest;
import com.sellphones.entity.product.Attribute;
import com.sellphones.entity.product.ProductFilter;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class AdminProductFilterSpecification {
    public static Specification<ProductFilter> build(AdminProductFilterFilterRequest request){
        Specification<ProductFilter> spec = (root, query, cb) -> cb.conjunction();

        if(request.getKeyword() != null){
            spec = spec.and(containsKeyword(request.getKeyword()));
        }

        if(request.getStartDate() != null && request.getEndDate() != null){
            spec = spec.and(hasDateBetween(request.getStartDate(), request.getEndDate()));
        }

        return spec;
    }



    public static Specification<ProductFilter> containsKeyword(String keyword){
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%");
    }

    public static Specification<ProductFilter> hasDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.between(root.get("createdAt"), startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
    }
}
