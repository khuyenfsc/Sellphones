package com.sellphones.specification.admin;

import com.sellphones.dto.address.admin.AdminAddressFilterRequest;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.address.AddressType;
import org.springframework.data.jpa.domain.Specification;

public class AdminAddressSpecificationBuilder {
    public static Specification<Address> build(AdminAddressFilterRequest request){
        Specification<Address> spec = (root, query, cb) -> cb.conjunction();

        if(request.getAddressType() != null){
            spec = spec.and(hasType(request.getAddressType()));
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

    public static Specification<Address> hasType(AddressType addressType){
        return (root, query, cb) -> cb.equal(root.get("addressType"),  addressType);
    }

    public static Specification<Address> hasStreetContain(String street){
        return (root, query, cb) -> cb.like(cb.lower(root.get("street")), "%" + street.toLowerCase() + "%");
    }

    public static Specification<Address> hasWardContain(String ward){
        return (root, query, cb) -> cb.like(cb.lower(root.get("ward")), "%" + ward.toLowerCase() + "%");
    }

    public static Specification<Address> hasDistrictContain(String district){
        return (root, query, cb) -> cb.like(cb.lower(root.get("district")), "%" + district.toLowerCase() + "%");
    }

    public static Specification<Address> hasProvinceContain(String province){
        return (root, query, cb) -> cb.like(cb.lower(root.get("cccd")), "%" + province.toLowerCase() + "%");
    }

}
