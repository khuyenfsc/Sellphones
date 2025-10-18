package com.sellphones.specification;

import com.sellphones.dto.order.OrderFilterRequest;
import com.sellphones.entity.order.Order;
import com.sellphones.entity.order.OrderStatus;
import com.sellphones.utils.SecurityUtils;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class OrderSpecificationBuilder {

    public static Specification<Order> build(OrderFilterRequest request){
        Specification<Order> spec = (root, query, cb) -> cb.conjunction();

        if(request.getStartDate() != null && request.getEndDate() != null){
            spec = spec.and(hasDateBetween(request.getStartDate(), request.getEndDate()));
        }

        if(request.getStatus() != null){
            spec = spec.and(hasStatus(request.getStatus()));
        }

        spec = spec.and(hasEmail(SecurityUtils.extractNameFromAuthentication()));

        return spec;
    }

    public static Specification<Order> hasDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.between(root.get("orderedAt"), startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
    }

    public static Specification<Order> hasStatus(OrderStatus orderStatus){
        return (root, query, cb) -> cb.equal(root.get("orderStatus"), orderStatus);
    }

    public static Specification<Order> hasEmail(String email){
        return (root, query, cb) -> cb.equal(root.get("user").get("email"), email);

    }
}
