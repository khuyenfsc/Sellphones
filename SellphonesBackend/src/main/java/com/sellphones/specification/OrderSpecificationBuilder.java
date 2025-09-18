package com.sellphones.specification;

import com.sellphones.entity.order.Order;
import com.sellphones.entity.order.OrderStatus;
import com.sellphones.utils.SecurityUtils;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class OrderSpecificationBuilder {

    public static Specification<Order> build(LocalDate startDate, LocalDate endDate, OrderStatus orderStatus){
        Specification<Order> spec = (root, query, cb) -> cb.conjunction();

        if(startDate != null && endDate != null){
            spec = spec.and(hasDateBetween(startDate, endDate));
        }

        if(orderStatus != null){
            spec = spec.and(hasStatus(orderStatus));
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
