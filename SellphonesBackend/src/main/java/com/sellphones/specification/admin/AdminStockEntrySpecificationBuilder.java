package com.sellphones.specification.admin;

import com.sellphones.dto.inventory.admin.AdminStockEntryFilterRequest;
import com.sellphones.entity.inventory.StockEntry;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.time.LocalDate;

public class AdminStockEntrySpecificationBuilder {
    public static Specification<StockEntry> buildWithSupplierId(AdminStockEntryFilterRequest request, Long supplierId){
        Specification<StockEntry> spec = (root, query, cb) -> cb.conjunction();

        spec = spec.and(hasSupplierId(supplierId));

        if(request.getProductVariantName() != null){
            spec = spec.and(hasVariantNameContains(request.getProductVariantName()));
        }

        if(request.getWarehouseName() != null){
            spec = spec.and(hasWarehouseNameContains(request.getWarehouseName()));
        }
//
//        if(request.getSupplierName() != null){
//            spec = spec.and(hasSupplierNameContain(request.getSupplierName()));
//        }
//
//        if(request.getSupplierEmail() != null){
//            spec = spec.and(hasSupplierEmailContain(request.getSupplierEmail()));
//        }
//
//        if(request.getSupplierPhoneNumber() != null){
//            spec = spec.and(hasSupplierPhoneNumberContain(request.getSupplierPhoneNumber()));
//        }

        if(request.getStartDate() != null && request.getEndDate() != null){
            spec = spec.and(hasImportDateBetween(request.getStartDate(), request.getEndDate()));
        }

        if(request.getMinPrice() != null && request.getMaxPrice() != null){
            spec = spec.and(hasPriceBetween(request.getMinPrice(), request.getMaxPrice()));
        }

        return spec;
    }

    public static Specification<StockEntry> buildWithInventoryId(AdminStockEntryFilterRequest request, Long inventoryId){
        Specification<StockEntry> spec = (root, query, cb) -> cb.conjunction();

        spec = spec.and(hasInventoryId(inventoryId));

        if(request.getProductVariantName() != null){
            spec = spec.and(hasVariantNameContains(request.getProductVariantName()));
        }

        if(request.getWarehouseName() != null){
            spec = spec.and(hasWarehouseNameContains(request.getWarehouseName()));
        }

        if(request.getStartDate() != null && request.getEndDate() != null){
            spec = spec.and(hasImportDateBetween(request.getStartDate(), request.getEndDate()));
        }

        if(request.getMinPrice() != null && request.getMaxPrice() != null){
            spec = spec.and(hasPriceBetween(request.getMinPrice(), request.getMaxPrice()));
        }

        return spec;
    }

    public static Specification<StockEntry> hasInventoryId(Long inventoryId){
        return (root, query, cb) -> cb.equal(root.get("inventory").get("id"), inventoryId);
    }

    public static Specification<StockEntry> hasSupplierId(Long supplierId){
        return (root, query, cb) -> cb.equal(root.get("supplier").get("id"), supplierId);
    }

    public static Specification<StockEntry> hasWarehouseNameContains(String warehouseName){
        return (root, query, cb) -> cb.like(cb.lower(root.get("inventory").get("warehouse").get("name")), "%" + warehouseName.toLowerCase() + "%");
    }

    public static Specification<StockEntry> hasVariantNameContains(String variantName){
        return (root, query, cb) -> cb.like(cb.lower(root.get("inventory").get("productVariant").get("productVariantName")), "%" + variantName.toLowerCase() + "%");
    }

    public static Specification<StockEntry> hasSupplierNameContain(String supplierName){
        return (root, query, cb) -> cb.like(cb.lower(root.get("supplier").get("name")), "%" + supplierName.toLowerCase() + "%");
    }

    public static Specification<StockEntry> hasSupplierEmailContain(String supplierEmail){
        return (root, query, cb) -> cb.like(cb.lower(root.get("supplier").get("email")), "%" + supplierEmail.toLowerCase() + "%");
    }

    public static Specification<StockEntry> hasSupplierPhoneNumberContain(String supplierPhoneNumber){
        return (root, query, cb) -> cb.like(cb.lower(root.get("supplier").get("phoneNumber")), "%" + supplierPhoneNumber.toLowerCase() + "%");
    }

    public static Specification<StockEntry> hasImportDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.between(root.get("importDate"), startDate, endDate);
    }

    public static Specification<StockEntry> hasPriceBetween(BigDecimal minPrice, BigDecimal maxPrice){
        return (root, query, cb) -> cb.between(root.get("purchasePrice"), minPrice, maxPrice);
    }
}
