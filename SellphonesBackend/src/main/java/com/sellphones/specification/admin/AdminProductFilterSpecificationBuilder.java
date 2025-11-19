package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminProductFilter_FilterRequest;
import com.sellphones.entity.product.ProductFilter;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class AdminProductFilterSpecificationBuilder {
    public static Specification<ProductFilter> build(AdminProductFilter_FilterRequest request, Long categoryId){
        Specification<ProductFilter> spec = (root, query, cb) -> cb.conjunction();

        spec = spec.and(hasCategoryId(categoryId));

        if(request.getKeyword() != null){
            spec = spec.and(containsKeyword(request.getKeyword()));
        }

        return spec;
    }



    public static Specification<ProductFilter> containsKeyword(String keyword){
        return (root, query, cb) -> cb.like(
                cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%"
        );
    }

    public static Specification<ProductFilter> hasCategoryId(Long categoryId){
        return (root, query, cb) -> cb.equal(
                root.get("category").get("id"), categoryId
        );
    }

//    public static Specification<ProductFilter> hasDateBetween(LocalDate startDate, LocalDate endDate){
//        return (root, query, cb) -> cb.between(root.get("createdAt"), startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
//    }
}
