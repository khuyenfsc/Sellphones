package com.sellphones.specification;

import com.sellphones.dto.product.request.FilterRequest;
import com.sellphones.dto.product.request.QueryRequest;
import com.sellphones.dto.product.request.StaticFilterRequest;
import com.sellphones.entity.product.Brand;
import com.sellphones.entity.product.Category;
import com.sellphones.entity.product.Product;
import com.sellphones.entity.product.ProductAttributeValue;
import jakarta.persistence.criteria.Join;
import lombok.val;
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

        if(staticFilter.getCategoryId() != null){
            spec = spec.and(hasCategory(staticFilter.getCategoryId()));
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
                // log và bỏ qua filter không hợp lệ
                System.err.println("Invalid key (not a number): " + entry.getKey());
            } catch (Exception e) {
                // log các lỗi khác trong parseDynamicFilter
                System.err.println("Error parsing filter: key=" + entry.getKey() + ", value=" + entry.getValue());
            }
        }

        return spec;

    }


    public static Specification<Product> priceBetween(BigDecimal minPrice, BigDecimal maxPrice){
        return (root, query, cb) -> cb.between(root.get("minPrice"), minPrice, maxPrice);
    }

    public static Specification<Product> hasCategory(Long categoryId){
//        return (root, query, cb) -> cb.equal(root.get("category").get("id"), categoryId);
        return (root, query, cb) -> cb.equal(root.get("category").get("id"), categoryId);

    }

    public static Specification<Product> hasBrand(Long brandId){
//        return (root, query, cb) -> cb.equal(root.get("brand").get("id"), brandId);
        return (root, query, cb) -> cb.equal(root.get("brand").get("id"), brandId);
    }

    public static Specification<Product> hasAttributeEqual(Long id, BigDecimal attributeVal){
        return (root, query, cb) -> {
            query.distinct(true);
            Join<Product, ProductAttributeValue> pav = root.join("attributeValues");

            return cb.and(
                    cb.equal(pav.get("attribute").get("id"), id),
                    cb.equal(pav.get("numericVal"), attributeVal)
            );
        };

    }

    public static Specification<Product> hasAttributeGreater(Long id, BigDecimal attributeVal){
        return (root, query, cb) -> {
            query.distinct(true);
            Join<Product, ProductAttributeValue> pav = root.join("attributeValues");

            return cb.and(
                    cb.equal(pav.get("attribute").get("id"), id),
                    cb.greaterThanOrEqualTo(pav.get("numericVal"), attributeVal)
            );
        };

    }

    public static Specification<Product> hasAttributeLess(Long id, BigDecimal attributeVal){
        return (root, query, cb) -> {
            query.distinct(true);
            Join<Product, ProductAttributeValue> pav = root.join("attributeValues");

            return cb.and(
                    cb.equal(pav.get("attribute").get("id"), id),
                    cb.lessThanOrEqualTo(pav.get("numericVal"), attributeVal)
            );
        };

    }

    public static Specification<Product> hasAttributeContains(Long id, String attributeVal){
        return (root, query, cb) -> {
            query.distinct(true);
            Join<Product, ProductAttributeValue> pav = root.join("attributeValues");

            return cb.and(
                    cb.equal(pav.get("attribute").get("id"), id),
                    cb.like(pav.get("strVal"), "%" + attributeVal + "%")
            );
        };

    }

    public static Specification<Product> hasAttributeBetween(Long id, BigDecimal minAttributeVal, BigDecimal maxAttributeVal){
        return (root, query, cb) -> {
            query.distinct(true);
            Join<Product, ProductAttributeValue> pav = root.join("attributeValues");

            return cb.and(
                    cb.equal(pav.get("attribute").get("id"), id),
                    cb.between(pav.get("numericVal"), minAttributeVal, maxAttributeVal)
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
