package com.sellphones.mapper;

import com.sellphones.dto.address.AddressRequest;
import com.sellphones.dto.address.BaseAddressRequest;
import com.sellphones.dto.address.admin.AdminAddressRequest;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.address.AddressType;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class AddressMapper {
    public Address mapToAddressEntity(BaseAddressRequest request){
        Address address = Address.builder()
                .street(request.getStreet())
                .ward(request.getWard())
                .district(request.getDistrict())
                .province(request.getProvince())
                .createdAt(LocalDateTime.now())
                .build();

        return address;
    }

}
