package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminCategoryOptionValueFilterRequest;
import com.sellphones.entity.product.CategoryOptionValue;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class AdminCategoryOptionValueSpecificationBuilder {
    public static Specification<CategoryOptionValue> build(AdminCategoryOptionValueFilterRequest request, Long categoryOptionid){
        Specification<CategoryOptionValue> spec = (root, query, cb) -> cb.conjunction();

        if(request.getKeyword() != null){
            spec = spec.and(containsKeyword(request.getKeyword()));
        }

//        if(request.getStartDate() != null && request.getEndDate() != null){
//            spec = spec.and(hasDateBetween(request.getStartDate(), request.getEndDate()));
//        }

        spec = spec.and(hasCategoryId(categoryOptionid));

        return spec;
    }


    public static Specification<CategoryOptionValue> hasCategoryId(Long attributeId){
        return (root, query, cb) -> cb.equal(root.get("categoryOption").get("id"), attributeId);
    }

    public static Specification<CategoryOptionValue> containsKeyword(String keyword){
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%");
    }

    public static Specification<CategoryOptionValue> hasDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.between(root.get("createdAt"), startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
    }
}
