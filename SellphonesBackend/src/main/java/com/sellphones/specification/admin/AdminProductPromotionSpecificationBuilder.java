package com.sellphones.specification.admin;

import com.sellphones.dto.promotion.admin.AdminProductPromotionFilterRequest;
import com.sellphones.entity.promotion.ProductPromotion;
import com.sellphones.entity.promotion.PromotionType;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class AdminProductPromotionSpecificationBuilder {
    public static Specification<ProductPromotion> build(AdminProductPromotionFilterRequest request){
        Specification<ProductPromotion> spec = (root, query, cb) -> cb.conjunction();

        if(request.getName() != null){
            spec = spec.and(hasNameContain(request.getName()));
        }

        if(request.getType() != null){
            spec = spec.and(hasPromotionType(request.getType()));
        }

        if(request.getStartDate() != null && request.getEndDate() != null){
            spec = spec.and(hasDateBetween(request.getStartDate(), request.getEndDate()));
        }

        return spec;
    }



    public static Specification<ProductPromotion> hasNameContain(String name){
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<ProductPromotion> hasPromotionType(PromotionType type){
        return (root, query, cb) -> cb.equal(root.get("type"), type);
    }

    public static Specification<ProductPromotion> hasDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.and(
                cb.between(root.get("startDate"), startDate, endDate),
                cb.between(root.get("endDate"), startDate, endDate)
        );
    }

}
