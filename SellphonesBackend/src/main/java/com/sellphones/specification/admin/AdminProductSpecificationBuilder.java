package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminProduct_FilterRequest;
import com.sellphones.entity.product.Product;
import com.sellphones.entity.product.ProductStatus;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

public class AdminProductSpecificationBuilder {
    public static Specification<Product> build(AdminProduct_FilterRequest request){
        Specification<Product> spec = (root, query, cb) -> cb.conjunction();

        if(request.getKeyword() != null){
            spec = spec.and(containsKeyword(request.getKeyword()));
        }

        if(request.getStatus() != null){
            spec = spec.and(hasStatus(request.getStatus()));
        }

        if(request.getMinPrice() != null && request.getMaxPrice() != null){
            spec = spec.and(priceBetween(request.getMinPrice(), request.getMaxPrice()));
        }

        if(request.getMinStar() != null && request.getMaxStar() != null){
            spec = spec.and(hasStarBetween(request.getMinStar(), request.getMaxStar()));
        }

        if(request.getIsNew() != null){
            spec = spec.and(isNew(request.getIsNew()));
        }

        if(request.getIsFeatured() != null){
            spec = spec.and(isFeatured(request.getIsFeatured()));
        }

        return spec;
    }

    public static Specification<Product> containsKeyword(String keyword){
        return (root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%"),
                cb.like(cb.lower(root.get("brand").get("name")), "%" + keyword.toLowerCase() + "%"),
                cb.like(cb.lower(root.get("category").get("name")), "%" + keyword.toLowerCase() + "%")
        );
    }

    public static Specification<Product> hasStatus(ProductStatus status){
        return (root, query, cb) -> cb.equal(
                root.get("status"), status
        );
    }

    public static Specification<Product> priceBetween(BigDecimal minPrice, BigDecimal maxPrice){
        return (root, query, cb) -> cb.between(
                root.get("thumbnailProduct").get("currentPrice"), minPrice, maxPrice
        );
    }

    public static Specification<Product> hasStarBetween(Integer minStar, Integer maxStar){
        return (root, query, cb) -> cb.between(
                root.get("averageRating"), minStar, maxStar
        );
    }

    public static Specification<Product> isNew(boolean isNew){
        return (root, query, cb) -> cb.equal(
                root.get("isNew"), isNew
        );
    }

    public static Specification<Product> isFeatured(boolean isFeatured){
        return (root, query, cb) -> cb.equal(
                root.get("isFeatured"), isFeatured
        );
    }

}
