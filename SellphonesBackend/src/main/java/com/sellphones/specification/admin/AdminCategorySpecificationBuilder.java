package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminCategory_FilterRequest;
import com.sellphones.entity.product.Category;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class AdminCategorySpecificationBuilder {
    public static Specification<Category> build(AdminCategory_FilterRequest request){
        Specification<Category> spec = (root, query, cb) -> cb.conjunction();

        if(request.getName() != null){
            spec = spec.and(containsKeyword(request.getName()));
        }

        if(request.getFeaturedOnHomepage() != null){
            spec = spec.and(isFeatured(request.getFeaturedOnHomepage()));
        }

//        if(request.getStartDate() != null && request.getEndDate() != null){
//            spec = spec.and(hasDateBetween(request.getStartDate(), request.getEndDate()));
//        }

        return spec;
    }



    public static Specification<Category> containsKeyword(String keyword){
        return (root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%"),
                cb.like(cb.lower(root.get("code")), "%" + keyword.toLowerCase() + "%")
        );
    }

    public static Specification<Category> isFeatured(Boolean isFeatured){
        return (root, query, cb) -> cb.equal(root.get("featuredOnHomepage"), isFeatured);
    }

    public static Specification<Category> hasDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.between(root.get("createdAt"), startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
    }
}
