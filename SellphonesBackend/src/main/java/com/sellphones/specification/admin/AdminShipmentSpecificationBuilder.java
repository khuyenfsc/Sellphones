package com.sellphones.specification.admin;

import com.sellphones.dto.order.admin.AdminShipmentFilterRequest;
import com.sellphones.entity.order.DeliveryPartner;
import com.sellphones.entity.order.Shipment;
import org.springframework.data.jpa.domain.Specification;

public class AdminShipmentSpecificationBuilder {
    public static Specification<Shipment> build(AdminShipmentFilterRequest request){
        Specification<Shipment> spec = (root, query, cb) -> cb.conjunction();

        if(request.getOrderId() != null){
            spec = spec.and(hasOrderId(request.getOrderId()));
        }

        if(request.getCode() != null){
            spec = spec.and(hasCodeStartWith(request.getCode()));
        }

        if(request.getPartner() != null){
            spec = spec.and(hasDeliveryPartner(request.getPartner()));
        }

        if(request.getWarehouseName() != null){
            spec = spec.and(hasWarehouseNameContain(request.getWarehouseName()));
        }

        if(request.getCustomerName() != null){
            spec = spec.and(hasCustomerNameContain(request.getCustomerName()));
        }

        return spec;
    }

    public static Specification<Shipment> hasOrderId(Long orderId){
        return (root, query, cb) -> cb.equal(root.get("order").get("id"), orderId);
    }

    public static Specification<Shipment> hasCodeStartWith(String code){
        return (root, query, cb) -> cb.like(root.get("code"), code + "%");
    }

    public static Specification<Shipment> hasDeliveryPartner(DeliveryPartner partner){
        return (root, query, cb) -> cb.equal(root.get("partner"), partner);
    }

    public static Specification<Shipment> hasWarehouseNameContain(String warehouseName){
        return (root, query, cb) -> cb.like(root.get("inventory").get("warehouse").get("name"), "%" + warehouseName + "%");
    }

    public static Specification<Shipment> hasCustomerNameContain(String customerName){
        return (root, query, cb) -> cb.like(root.get("order").get("customerInfo").get("fullName"), "%" + customerName + "%");
    }

}
