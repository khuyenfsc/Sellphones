package com.sellphones.mapper;

import com.sellphones.dto.address.AddressRequest;
import com.sellphones.entity.address.Address;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class AddressMapper {
    public Address mapToAddressEntity(AddressRequest request){
        Address address = Address.builder()
                .street(request.getStreet())
                .ward(request.getWard())
                .district(request.getDistrict())
                .province(request.getProvince())
                .addressType(request.getAddressType())
                .createdAt(LocalDateTime.now())
                .build();

        return address;
    }
}
