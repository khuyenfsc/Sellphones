package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminAttributeFilterRequest;
import com.sellphones.dto.product.admin.AdminCategoryFilterRequest;
import com.sellphones.entity.product.Attribute;
import com.sellphones.entity.product.Category;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class AdminCategorySpecificationBuilder {
    public static Specification<Category> build(AdminCategoryFilterRequest request){
        Specification<Category> spec = (root, query, cb) -> cb.conjunction();

        if(request.getKeyword() != null){
            spec = spec.and(containsKeyword(request.getKeyword()));
        }

        if(request.getStartDate() != null && request.getEndDate() != null){
            spec = spec.and(hasDateBetween(request.getStartDate(), request.getEndDate()));
        }

        return spec;
    }



    public static Specification<Category> containsKeyword(String keyword){
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%");
    }

    public static Specification<Category> hasDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.between(root.get("createdAt"), startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
    }
}
