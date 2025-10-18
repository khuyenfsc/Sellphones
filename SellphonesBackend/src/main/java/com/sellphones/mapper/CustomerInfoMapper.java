package com.sellphones.mapper;

import com.sellphones.dto.customer.CustomerInfoRequest;
import com.sellphones.entity.customer.CustomerInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class CustomerInfoMapper {
    public CustomerInfo mapToCustomerInfoEntity(CustomerInfoRequest request){
        CustomerInfo customerInfo = CustomerInfo.builder()
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .dateOfBirth(request.getDateOfBirth())
                .createdAt(LocalDateTime.now())
                .build();
        return customerInfo;
    }
}
