package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminFilterOption_FilterRequest;
import com.sellphones.entity.product.FilterOption;
import org.springframework.data.jpa.domain.Specification;

public class AdminFilterOptionSpecification {

    public static Specification<FilterOption> build(AdminFilterOption_FilterRequest request, Long filterId){
        Specification<FilterOption> spec = (root, query, cb) -> cb.conjunction();

        spec = spec.and(hasFilterId(filterId));

        if(request.getName() != null){
            spec = spec.and(hasNameContains(request.getName()));
        }

        return spec;
    }



    public static Specification<FilterOption> hasNameContains(String name){
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<FilterOption> hasFilterId(Long filterId){
        return (root, query, cb) -> cb.equal(root.get("productFilter").get("id"), filterId);
    }

}
