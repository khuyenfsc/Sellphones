package com.sellphones.specification.admin;

import com.sellphones.dto.order.admin.AdminOrderFilterRequest;
import com.sellphones.entity.order.Order;
import com.sellphones.entity.order.OrderStatus;
import com.sellphones.entity.payment.PaymentMethodType;
import com.sellphones.entity.payment.PaymentStatus;
import com.sellphones.utils.SecurityUtils;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class AdminOrderSpecificationBuilder {

    public static Specification<Order> build(AdminOrderFilterRequest request){
        Specification<Order> spec = (root, query, cb) -> cb.conjunction();

        if(request.getCode() != null){
            spec = spec.and(containsCode(request.getCode()));
        }

        if(request.getEmail() != null){
            spec = spec.and(hasEmail(request.getEmail()));
        }

        if(request.getOrderStatus() != null){
            spec = spec.and(hasStatus(request.getOrderStatus()));
        }

        if(request.getPaymentMethodType() != null){
            spec = spec.and(hasPaymentMethodType(request.getPaymentMethodType()));
        }

        if(request.getCustomerName() != null){
            spec = spec.and(containsCustomerName(request.getCustomerName()));
        }

        if(request.getPaymentStatus() != null){
            spec = spec.and(hasPaymentStatus(request.getPaymentStatus()));
        }

        if(request.getStartDate() != null && request.getEndDate() != null){
            spec = spec.and(hasDateBetween(request.getStartDate(), request.getEndDate()));
        }

        return spec;
    }



    public static Specification<Order> containsCode(String code){
        return (root, query, cb) -> cb.like(root.get("code"), code + "%");
    }

    public static Specification<Order> hasDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.between(root.get("orderedAt"), startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
    }

    public static Specification<Order> hasStatus(OrderStatus orderStatus){
        return (root, query, cb) -> cb.equal(root.get("orderStatus"), orderStatus);
    }

    public static Specification<Order> hasPaymentMethodType(PaymentMethodType paymentMethodType){
        return (root, query, cb) -> cb.equal(root.get("paymentMethod").get("PaymentMethodType"), paymentMethodType);
    }

    public static Specification<Order> containsCustomerName(String customerName){
        return (root, query, cb) -> cb.like(root.get("customerInfo").get("fullName"), customerName + "%");
    }

    public static Specification<Order> hasPaymentStatus(PaymentStatus paymentStatus){
        return (root, query, cb) -> cb.equal(root.get("paymentStatus"), paymentStatus);
    }

    public static Specification<Order> hasEmail(String email){
        return (root, query, cb) -> cb.equal(root.get("user").get("email"), email);
    }

}
