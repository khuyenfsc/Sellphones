package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminAttribute_FilterRequest;
import com.sellphones.entity.product.Attribute;
import org.springframework.data.jpa.domain.Specification;

public class AdminAttributeSpecificationBuilder {

    public static Specification<Attribute> build(AdminAttribute_FilterRequest request){
        Specification<Attribute> spec = (root, query, cb) -> cb.conjunction();

        if(request.getName() != null){
            spec = spec.and(containsKeyword(request.getName()));
        }

//        if(request.getStartDate() != null && request.getEndDate() != null){
//            spec = spec.and(hasDateBetween(request.getStartDate(), request.getEndDate()));
//        }

        return spec;
    }



    public static Specification<Attribute> containsKeyword(String keyword){
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%");
    }

//    public static Specification<Attribute> hasDateBetween(LocalDate startDate, LocalDate endDate){
//        return (root, query, cb) -> cb.between(root.get("createdAt"), startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
//    }

}
