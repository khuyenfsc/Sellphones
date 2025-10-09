package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminStockEntryFilterRequest;
import com.sellphones.entity.product.StockEntry;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class AdminStockEntrySpecificationBuilder {
    public static Specification<StockEntry> build(AdminStockEntryFilterRequest request){
        Specification<StockEntry> spec = (root, query, cb) -> cb.conjunction();

        if(request.getProductVariantName() != null){
            spec = spec.and(hasVariantNameContain(request.getProductVariantName()));
        }

        if(request.getSupplierName() != null){
            spec = spec.and(hasSupplierNameContain(request.getSupplierName()));
        }

        if(request.getSupplierEmail() != null){
            spec = spec.and(hasSupplierEmailContain(request.getSupplierEmail()));
        }

        if(request.getSupplierPhoneNumber() != null){
            spec = spec.and(hasSupplierPhoneNumberContain(request.getSupplierPhoneNumber()));
        }

        if(request.getStartDate() != null && request.getEndDate() != null){
            spec = spec.and(hasImportDateBetween(request.getStartDate(), request.getEndDate()));
        }

        return spec;
    }

    public static Specification<StockEntry> hasVariantNameContain(String variantName){
        return (root, query, cb) -> cb.like(cb.lower(root.get("productVariantName")), "%" + variantName.toLowerCase() + "%");
    }

    public static Specification<StockEntry> hasSupplierNameContain(String supplierName){
        return (root, query, cb) -> cb.like(cb.lower(root.get("supplierName")), "%" + supplierName.toLowerCase() + "%");
    }

    public static Specification<StockEntry> hasSupplierEmailContain(String supplierEmail){
        return (root, query, cb) -> cb.like(cb.lower(root.get("supplierEmail")), "%" + supplierEmail.toLowerCase() + "%");
    }

    public static Specification<StockEntry> hasSupplierPhoneNumberContain(String supplierPhoneNumber){
        return (root, query, cb) -> cb.like(cb.lower(root.get("supplierPhoneNumber")), "%" + supplierPhoneNumber.toLowerCase() + "%");
    }

    public static Specification<StockEntry> hasImportDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.between(root.get("importDate"), startDate, endDate);
    }
}
