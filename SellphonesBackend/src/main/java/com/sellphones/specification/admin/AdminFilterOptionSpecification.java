package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminFilterOptionFilterRequest;
import com.sellphones.entity.product.AttributeValue;
import com.sellphones.entity.product.FilterOption;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class AdminFilterOptionSpecification {

    public static Specification<FilterOption> build(AdminFilterOptionFilterRequest request, Long filterId){
        Specification<FilterOption> spec = (root, query, cb) -> cb.conjunction();

        spec = spec.and(hasFilterId(filterId));

        if(request.getKeyword() != null){
            spec = spec.and(containsKeyword(request.getKeyword()));
        }

        if(request.getStartDate() != null && request.getEndDate() != null){
            spec = spec.and(hasDateBetween(request.getStartDate(), request.getEndDate()));
        }

        return spec;
    }



    public static Specification<FilterOption> containsKeyword(String keyword){
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%");
    }

    public static Specification<FilterOption> hasDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.between(root.get("createdAt"), startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
    }

    public static Specification<FilterOption> hasFilterId(Long filterId){
        return (root, query, cb) -> cb.equal(root.get("productFilter").get("id"), filterId);
    }

}
