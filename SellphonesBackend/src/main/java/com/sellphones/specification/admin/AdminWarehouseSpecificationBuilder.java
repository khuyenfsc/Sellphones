package com.sellphones.specification.admin;

import com.sellphones.dto.inventory.admin.AdminWarehouseFilterRequest;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.inventory.Warehouse;
import org.springframework.data.jpa.domain.Specification;

public class AdminWarehouseSpecificationBuilder {
    public static Specification<Warehouse> build(AdminWarehouseFilterRequest request){
        Specification<Warehouse> spec = (root, query, cb) -> cb.conjunction();

        if(request.getName() != null){
            spec = spec.and(hasNameContain(request.getName()));
        }

        if(request.getStreet() != null){
            spec = spec.and(hasStreetContain(request.getStreet()));
        }

        if(request.getWard() != null){
            spec = spec.and(hasWardContain(request.getWard()));
        }

        if(request.getDistrict() != null){
            spec = spec.and(hasDistrictContain(request.getDistrict()));
        }

        if(request.getProvince() != null){
            spec = spec.and(hasProvinceContain(request.getProvince()));
        }

        return spec;
    }

    public static Specification<Warehouse> hasNameContain(String name){
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<Warehouse> hasStreetContain(String street){
        return (root, query, cb) -> cb.like(cb.lower(root.get("address").get("street")), "%" + street.toLowerCase() + "%");
    }

    public static Specification<Warehouse> hasWardContain(String ward){
        return (root, query, cb) -> cb.like(cb.lower(root.get("address").get("ward")), "%" + ward.toLowerCase() + "%");
    }

    public static Specification<Warehouse> hasDistrictContain(String district){
        return (root, query, cb) -> cb.like(cb.lower(root.get("address").get("district")), "%" + district.toLowerCase() + "%");
    }

    public static Specification<Warehouse> hasProvinceContain(String province){
        return (root, query, cb) -> cb.like(cb.lower(root.get("address").get("cccd")), "%" + province.toLowerCase() + "%");
    }
}
