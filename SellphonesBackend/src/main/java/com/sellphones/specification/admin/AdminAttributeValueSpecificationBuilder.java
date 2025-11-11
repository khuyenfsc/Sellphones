package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminAttributeValueFilterRequest;
import com.sellphones.entity.product.AttributeValue;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class AdminAttributeValueSpecificationBuilder {
    public static Specification<AttributeValue> build(AdminAttributeValueFilterRequest request, Long attributeVId){
        Specification<AttributeValue> spec = (root, query, cb) -> cb.conjunction();

        if(request.getKeyword() != null){
            spec = spec.and(containsKeyword(request.getKeyword()));
        }

//        if(request.getStartDate() != null && request.getEndDate() != null){
//            spec = spec.and(hasDateBetween(request.getStartDate(), request.getEndDate()));
//        }

        spec = spec.and(hasAttributeId(attributeVId));

        return spec;
    }


    public static Specification<AttributeValue> hasAttributeId(Long attributeId){
        return (root, query, cb) -> cb.equal(root.get("attribute").get("id"), attributeId);
    }

    public static Specification<AttributeValue> containsKeyword(String keyword){
        return (root, query, cb) -> cb.like(cb.lower(root.get("strVal")), "%" + keyword.toLowerCase() + "%");
    }

    public static Specification<AttributeValue> hasDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.between(root.get("createdAt"), startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
    }
}
