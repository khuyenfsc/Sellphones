package com.sellphones.specification.admin;

import com.sellphones.dto.inventory.admin.AdminInventory_FilterRequest;
import com.sellphones.entity.inventory.Inventory;
import org.springframework.data.jpa.domain.Specification;

public class AdminInventorySpecificationBuilder {

    public static Specification<Inventory> build(AdminInventory_FilterRequest request){
        Specification<Inventory> spec = (root, query, cb) -> cb.conjunction();

        if(request.getProductVariantName() != null){
            spec = spec.and(hasProductVariantContainContain(request.getProductVariantName()));
        }

        if(request.getMinStock() != null && request.getMaxStock() != null){
            spec = spec.and(hasQuantityBetween(request.getMinStock(), request.getMaxStock()));
        }



        return spec;
    }

    public static Specification<Inventory> buildWithWarehouseId(AdminInventory_FilterRequest request, Long warehouseId){
        Specification<Inventory> spec = (root, query, cb) -> cb.conjunction();

        spec = spec.and(hasWarehouseId(warehouseId));

        if(request.getProductVariantId() != null){
            spec = spec.and(hasVariantId(request.getProductVariantId()));
        }

        if(request.getProductVariantName() != null){
            spec = spec.and(hasProductVariantContainContain(request.getProductVariantName()));
        }

        if(request.getMinStock() != null && request.getMaxStock() != null){
            spec = spec.and(hasQuantityBetween(request.getMinStock(), request.getMaxStock()));
        }

        return spec;
    }



    public static Specification<Inventory> hasProductVariantContainContain(String productVariantName){
        return (root, query, cb) -> cb.like(cb.lower(root.get("productVariant").get("productVariantName")), "%" + productVariantName.toLowerCase() + "%");
    }

    public static Specification<Inventory> hasWarehouseId(Long warehouseId){
        return (root, query, cb) -> cb.equal(root.get("warehouse").get("id"), warehouseId);
    }

    public static Specification<Inventory> hasVariantId(Long variantId){
        return (root, query, cb) -> cb.equal(root.get("productVariant").get("id"), variantId);
    }

    public static Specification<Inventory> hasQuantityBetween(Long minStock, Long maxStock){
        return (root, query, cb) -> cb.between(
                root.get("quantity"), minStock, maxStock
        );
    }

}
