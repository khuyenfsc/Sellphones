package com.sellphones.specification.admin;

import com.sellphones.dto.promotion.admin.AdminGiftProductFilterRequest;
import com.sellphones.entity.promotion.GiftProduct;
import org.springframework.data.jpa.domain.Specification;

public class AdminGiftProductSpecificationBuilder {
    public static Specification<GiftProduct> build(AdminGiftProductFilterRequest request){
        Specification<GiftProduct> spec = (root, query, cb) -> cb.conjunction();

        if(request.getName() != null){
            spec = spec.and(hasNameContain(request.getName()));
        }

        if(request.getMaxStock() != null){
            spec = spec.and(hasStockLessOrEqualTo(request.getMaxStock()));
        }

        if(request.getMinPrice() != null && request.getMaxPrice() != null){
            spec = spec.and(priceBetween(request.getMinPrice(), request.getMaxPrice()));
        }

        return spec;
    }

    public static Specification<GiftProduct> hasNameContain(String name){
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<GiftProduct> hasStockLessOrEqualTo(Long maxStock){
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("stock"), maxStock);
    }

    public static Specification<GiftProduct> priceBetween(Long minPrice, Long maxPrice){
        return (root, query, cb) -> cb.between(root.get("price"), minPrice, maxPrice);
    }

}
