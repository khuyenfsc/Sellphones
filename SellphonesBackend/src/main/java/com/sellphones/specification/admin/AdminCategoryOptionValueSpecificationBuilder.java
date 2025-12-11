package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminCategoryOptionValue_FilterRequest;
import com.sellphones.entity.product.CategoryOptionValue;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class AdminCategoryOptionValueSpecificationBuilder {
    public static Specification<CategoryOptionValue> build(AdminCategoryOptionValue_FilterRequest request, Long categoryOptionid){
        Specification<CategoryOptionValue> spec = (root, query, cb) -> cb.conjunction();

        if(request.getName() != null){
            spec = spec.and(hasNameContains(request.getName()));
        }

        spec = spec.and(hasCategoryId(categoryOptionid));

        return spec;
    }


    public static Specification<CategoryOptionValue> hasCategoryId(Long attributeId){
        return (root, query, cb) -> cb.equal(root.get("categoryOption").get("id"), attributeId);
    }

    public static Specification<CategoryOptionValue> hasNameContains(String name){
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<CategoryOptionValue> hasDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.between(root.get("createdAt"), startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
    }
}
