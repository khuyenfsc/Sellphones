package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminProductVariantFilterRequest;
import com.sellphones.entity.product.*;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;


public class AdminProductVariantSpecificationBuilder {

    public static Specification<ProductVariant> build(AdminProductVariantFilterRequest request, Long productId){
        Specification<ProductVariant> spec = (root, query, cb) -> cb.conjunction();
        spec = spec.and(hasProductId(productId));

        if(request.getKeyword() != null){
            spec = spec.and(containsKeyword(request.getKeyword()));
        }

        if(request.getStatus() != null){
            spec = spec.and(hasStatus(request.getStatus()));
        }

        if(request.getMinPrice() != null && request.getMaxPrice() != null){
            spec = spec.and(priceBetween(request.getMinPrice(), request.getMaxPrice()));
        }

        return spec;
    }

    public static Specification<ProductVariant> containsKeyword(String keyword){
        return (root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("productVariantName")), "%" + keyword.toLowerCase() + "%"),
                cb.like(cb.lower(root.get("sku")), "%" + keyword.toLowerCase() + "%")
        );
    }

    public static Specification<ProductVariant> hasStatus(ProductStatus status){
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }

    public static Specification<ProductVariant> priceBetween(BigDecimal minPrice, BigDecimal maxPrice){
        return (root, query, cb) -> cb.between(root.get("currentPrice"), minPrice, maxPrice);
    }

    public static Specification<ProductVariant> hasProductId(Long productId){
        return (root, query, cb) -> cb.equal(root.get("product").get("id"), productId);
    }
}
