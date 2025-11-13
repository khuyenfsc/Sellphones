package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminCategoryOptionFilterRequest;
import com.sellphones.entity.product.CategoryOption;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class AdminCategoryOptionSpecificationBuilder {
    public static Specification<CategoryOption> build(AdminCategoryOptionFilterRequest request, Long categoryid){
        Specification<CategoryOption> spec = (root, query, cb) -> cb.conjunction();

        if(request.getKeyword() != null){
            spec = spec.and(containsKeyword(request.getKeyword()));
        }

//        if(request.getStartDate() != null && request.getEndDate() != null){
//            spec = spec.and(hasDateBetween(request.getStartDate(), request.getEndDate()));
//        }

        spec = spec.and(hasCategoryId(categoryid));

        return spec;
    }


    public static Specification<CategoryOption> hasCategoryId(Long attributeId){
        return (root, query, cb) -> cb.equal(root.get("category").get("id"), attributeId);
    }

    public static Specification<CategoryOption> containsKeyword(String keyword){
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%");
    }

    public static Specification<CategoryOption> hasDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.between(root.get("createdAt"), startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
    }
}
