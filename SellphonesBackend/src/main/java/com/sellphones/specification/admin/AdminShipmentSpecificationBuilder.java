package com.sellphones.specification.admin;

import com.sellphones.dto.order.admin.AdminShipment_FilterRequest;
import com.sellphones.entity.order.DeliveryPartner;
import com.sellphones.entity.order.Shipment;
import com.sellphones.entity.order.ShipmentStatus;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class AdminShipmentSpecificationBuilder {
    public static Specification<Shipment> build(AdminShipment_FilterRequest request){
        Specification<Shipment> spec = (root, query, cb) -> cb.conjunction();

        if(request.getCode() != null){
            spec = spec.and(hasOrderOrShipmentCodeContains(request.getCode()));
        }

        if(request.getPartner() != null){
            spec = spec.and(hasDeliveryPartner(request.getPartner()));
        }

        if(request.getStatus() != null){
            spec = spec.and(hasStatus(request.getStatus()));
        }

        if(request.getStartDate() != null && request.getEndDate() != null){
            spec = spec.and(hasExpectedDateBetween(request.getStartDate(), request.getEndDate()));
        }

        if(request.getCustomerName() != null){
            spec = spec.and(hasCustomerNameContain(request.getCustomerName()));
        }

        return spec;
    }

    public static Specification<Shipment> hasOrderOrShipmentCodeContains(String code){
        return (root, query, cb) -> cb.or(
            cb.like(
                cb.lower(root.get("order").get("code")), "%" + code.toLowerCase() + "%"
            ),
            cb.like(
                cb.lower(root.get("code")), "%" + code + "%"
            )
        );
    }

    public static Specification<Shipment> hasDeliveryPartner(DeliveryPartner partner){
        return (root, query, cb) -> cb.equal(root.get("partner"), partner);
    }

    public static Specification<Shipment> hasStatus(ShipmentStatus status){
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }

    public static Specification<Shipment> hasExpectedDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.between(
                root.get("expectedDeliveryDate"), startDate, endDate
        );
    }

    public static Specification<Shipment> hasCustomerNameContain(String customerName){
        return (root, query, cb) -> cb.like(
                root.get("order").get("customerInfo").get("fullName"), "%" + customerName + "%"
        );
    }

}
