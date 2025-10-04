package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminProductVariantFilterRequest;
import com.sellphones.entity.order.Order;
import com.sellphones.entity.product.Brand;
import com.sellphones.entity.product.Product;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.product.ProductVariantStatus;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

public class AdminProductVariantSpecification {

    public static Specification<ProductVariant> build(AdminProductVariantFilterRequest request){
        Specification<ProductVariant> spec = (root, query, cb) -> cb.conjunction();

        if(request.getKeyword() != null){
            spec = spec.and(containsKeyword(request.getKeyword()));
        }

        if(request.getSkuKeyword() != null){
            spec = spec.and(containsSkuHasKeyword(request.getSkuKeyword()));
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
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%");
    }

    public static Specification<ProductVariant> containsSkuHasKeyword(String skuKeyword){
        return (root, query, cb) -> cb.like(cb.lower(root.get("sku")), "%" + skuKeyword.toLowerCase() + "%");
    }

    public static Specification<ProductVariant> hasStatus(ProductVariantStatus status){
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }

    public static Specification<ProductVariant> priceBetween(Long minPrice, Long maxPrice){
        return (root, query, cb) -> cb.between(root.get("price"), minPrice, maxPrice);
    }
}
