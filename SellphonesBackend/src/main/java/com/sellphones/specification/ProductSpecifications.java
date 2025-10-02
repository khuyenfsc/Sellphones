//package com.sellphones.specification;
//
//import com.sellphones.entity.product.*;
//import jakarta.persistence.criteria.Join;
//import jakarta.persistence.criteria.JoinType;
//import org.springframework.data.jpa.domain.Specification;
//
//import java.math.BigDecimal;
//
//public class ProductSpecifications {
//
//    public static Specification<Product> hasBrand(String brand){
//        return (root, query, cb) -> cb.equal(root.get("brand"), brand);
//    }
//
//    public static Specification<Product> priceBetween(BigDecimal minPrice, BigDecimal maxPrice){
//        return (root, query, cb) -> cb.between(root.get("minPrice"), minPrice, maxPrice);
//    }
//
//    public static Specification<Product> hasRam(Integer minRam, Integer maxRam){
//        return (root, query, cb) ->{
//
//            query.distinct(true);
//
//            Join<Product, ProductVariant> pv = root.join("productVariants");
//            Join<Product, ProductAttribute> pa = root.join("productAttributes", JoinType.LEFT);
//            Join<ProductVariant, VariantAttribute> va = pv.join("variantAttributes", JoinType.LEFT);
//            Join<ProductAttribute, Attribute> pa_a = pa.join("attribute", JoinType.LEFT);
//            Join<ProductAttribute, Attribute> va_a = va.join("attribute", JoinType.LEFT);
//
//            return cb.or(
//                    cb.and(cb.equal(pa_a.get("name"), "RAM"),
//                            cb.between(pa.get("numericVal"), minRam, maxRam)
//                    ),
//                    cb.and(cb.equal(va_a.get("name"), "RAM"),
//                            cb.between(va.get("numericVal"), minRam, maxRam)
//                    )
//            );
//        };
//    }
//
//    public static Specification<Product> hasCpu(String cpu){
//        return (root, query, cb) -> {
//
//            query.distinct(true);
//
//            Join<Product, ProductVariant> pv = root.join("productVariants");
//            Join<Product, ProductAttribute> pa = root.join("productAttributes", JoinType.LEFT);
//            Join<ProductVariant, VariantAttribute> va = pv.join("variantAttributes", JoinType.LEFT);
//            Join<ProductAttribute, Attribute> pa_a = pa.join("attribute", JoinType.LEFT);
//            Join<ProductAttribute, Attribute> va_a = va.join("attribute", JoinType.LEFT);
//
//            return cb.or(
//                    cb.and(cb.equal(pa_a.get("name"), "CPU"),
//                            cb.like(pa.get("val"),"%" + cpu + "%")
//                    ),
//                    cb.and(cb.equal(va_a.get("name"), "RAM"),
//                            cb.like(va.get("val"), "%" + cpu + "%")
//                    )
//            );
//        };
//    }
//
//    public static Specification<Product> hasOs(String os){
//        return (root, query, cb) -> {
//
//            query.distinct(true);
//
//            Join<Product, ProductAttribute> pa = root.join("productAttributes", JoinType.LEFT);
//            Join<ProductAttribute, Attribute> a = pa.join("attribute", JoinType.LEFT);
//
//            return cb.or(
//                    cb.and(
//                            cb.equal(a.get("attribute"), "os"),
//                            cb.equal(pa.get("val"), os)
//                    )
//            );
//        };
//    }
//
//
//
//}
