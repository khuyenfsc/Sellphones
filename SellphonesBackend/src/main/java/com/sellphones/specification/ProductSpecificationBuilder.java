package com.sellphones.specification;

import com.sellphones.dto.product.QueryRequest;
import com.sellphones.dto.product.StaticFilterRequest;
import com.sellphones.entity.product.Product;
import com.sellphones.entity.product.AttributeValue;
import com.sellphones.entity.product.ProductStatus;
import com.sellphones.entity.product.ProductVariant;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class ProductSpecificationBuilder {

    public static Specification<Product> build(QueryRequest queryRequest){

        Specification<Product> spec = (root, query, cb) -> cb.conjunction();

        StaticFilterRequest staticFilter = queryRequest.get_static();
        Map<String, String> dynamicFilter = queryRequest.getDynamic();

        spec = spec.and(hasStatus(ProductStatus.ACTIVE));

        if(staticFilter.getCategoryName() != null){
            spec = spec.and(hasCategory(staticFilter.getCategoryName()));
        }

        if(staticFilter.getPriceRange() != null){

            String[] numbers = staticFilter.getPriceRange().split("\\D+");
            List<String> validNumbers = Arrays.stream(numbers)
                    .filter(s -> !s.isBlank())
                    .toList();

            try{
                if(validNumbers.size() >= 2){
                    BigDecimal minPrice = new BigDecimal(validNumbers.get(0));
                    BigDecimal maxPrice = new BigDecimal(validNumbers.get(1));
                    spec = spec.and(priceBetween(minPrice, maxPrice));
                }

            } catch (NumberFormatException e) {
                System.err.println("Invalid number in condition: " + staticFilter.getPriceRange());
            }
        }

        if(staticFilter.getBrandId() != null){
            spec = spec.and(hasBrand(staticFilter.getBrandId()));
        }

        for(Map.Entry<String, String> entry : dynamicFilter.entrySet()){
            try {
                Long id = Long.parseLong(entry.getKey());
                String condition = entry.getValue();

                spec = spec.and(parseDynamicFilter(id, condition));
            } catch (NumberFormatException e) {
                System.err.println("Invalid key (not a number): " + entry.getKey());
            } catch (Exception e) {
                System.err.println("Error parsing filter: key=" + entry.getKey() + ", value=" + entry.getValue());
            }
        }

        return spec;

    }


    public static Specification<Product> priceBetween(BigDecimal minPrice, BigDecimal maxPrice){
        return (root, query, cb) -> cb.between(root.get("thumbnailProduct").get("currentPrice"), minPrice, maxPrice);
    }

    public static Specification<Product> hasCategory(String categoryName){
//        return (root, query, cb) -> cb.equal(root.get("category").get("id"), categoryId);
        return (root, query, cb) -> cb.equal(root.get("category").get("name"), categoryName);

    }

    public static Specification<Product> hasStatus(ProductStatus status){
        return (root, query, cb) -> cb.equal(
                root.get("status"), status
        );
    }

    public static Specification<Product> hasBrand(Long brandId){
//        return (root, query, cb) -> cb.equal(root.get("brand").get("id"), brandId);
        return (root, query, cb) -> cb.equal(root.get("brand").get("id"), brandId);
    }

    public static Specification<Product> hasAttributeEqual(Long id, BigDecimal attributeVal){
        return (root, query, cb) -> {
            query.distinct(true);
            Join<Product, ProductVariant> pv = root.join("productVariants");
            Join<ProductVariant, AttributeValue> pv_av = pv.join("attributeValues");

            return cb.and(
                    cb.equal(pv_av.get("attribute").get("id"), id),
                    cb.equal(pv_av.get("numericVal"), attributeVal)
            );
        };

    }

    public static Specification<Product> hasAttributeGreater(Long id, BigDecimal attributeVal){
        return (root, query, cb) -> {
            query.distinct(true);
            Join<Product, ProductVariant> pv = root.join("productVariants");
            Join<ProductVariant, AttributeValue> pv_av = pv.join("attributeValues");

            return cb.and(
                    cb.equal(pv_av.get("attribute").get("id"), id),
                    cb.greaterThanOrEqualTo(pv_av.get("numericVal"), attributeVal)
            );
        };

    }

    public static Specification<Product> hasAttributeLess(Long id, BigDecimal attributeVal){
        return (root, query, cb) -> {
            query.distinct(true);
            Join<Product, ProductVariant> pv = root.join("productVariants");
            Join<ProductVariant, AttributeValue> pv_av = pv.join("attributeValues");

            return cb.and(
                    cb.equal(pv.get("attribute").get("id"), id),
                    cb.lessThanOrEqualTo(pv_av.get("numericVal"), attributeVal)
            );
        };

    }

    public static Specification<Product> hasAttributeContains(Long id, String attributeVal){
        return (root, query, cb) -> {
            query.distinct(true);
            Join<Product, ProductVariant> pv = root.join("productVariants");
            Join<ProductVariant, AttributeValue> pv_av = pv.join("attributeValues");
            System.out.println("hasAttributeContains " + id + " " + attributeVal);

            return cb.and(
                    cb.equal(pv_av.get("attribute").get("id"), id),
                    cb.like(cb.lower(pv_av.get("strVal")), "%" + attributeVal.toLowerCase() + "%")
            );
        };

    }

    public static Specification<Product> hasAttributeBetween(Long id, BigDecimal minAttributeVal, BigDecimal maxAttributeVal){
        return (root, query, cb) -> {
            query.distinct(true);
            Join<Product, ProductVariant> pv = root.join("productVariants");
            Join<ProductVariant, AttributeValue> pv_av = pv.join("attributeValues");

            return cb.and(
                    cb.equal(pv_av.get("attribute").get("id"), id),
                    cb.between(pv_av.get("numericVal"), minAttributeVal, maxAttributeVal)
            );
        };

    }

    public static Specification<Product> parseDynamicFilter(Long id, String condition){

        // Tách tất cả số trong chuỗi
        String[] numbers = condition.split("\\D+");

        // Lọc bỏ phần rỗng
        List<String> validNumbers = Arrays.stream(numbers)
                .filter(s -> !s.isBlank())
                .toList();

        try {
            if (condition.contains("bang") && !validNumbers.isEmpty()) {
                BigDecimal value = new BigDecimal(validNumbers.get(0));
                return hasAttributeEqual(id, value);

            } else if (condition.contains("tren") && !validNumbers.isEmpty()) {
                BigDecimal value = new BigDecimal(validNumbers.get(0));
                return hasAttributeGreater(id, value);

            } else if (condition.contains("duoi") && !validNumbers.isEmpty()) {
                BigDecimal value = new BigDecimal(validNumbers.get(0));
                return hasAttributeLess(id, value);

            } else if (condition.contains("chua")) {
                if (condition.contains("-")) {
                    condition = condition.substring(condition.indexOf("-") + 1).trim();
                }
                return hasAttributeContains(id, condition);

            } else if (validNumbers.size() >= 2) { // khoảng
                BigDecimal minValue = new BigDecimal(validNumbers.get(0));
                BigDecimal maxValue = new BigDecimal(validNumbers.get(1));
                return hasAttributeBetween(id, minValue, maxValue);
            }
        } catch (NumberFormatException e) {
            System.err.println("Invalid number in condition: " + condition);
        }

        return (root, query, cb) -> cb.conjunction();

    }

}
