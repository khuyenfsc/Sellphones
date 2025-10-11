package com.sellphones.mapper;

import com.sellphones.dto.inventory.admin.AdminSupplierRequest;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.inventory.Supplier;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class SupplierMapper {

    public Supplier mapToSupplierEntity(AdminSupplierRequest request, Address address){
        Supplier supplier = Supplier.builder()
                .name(request.getName())
                .contactName(request.getContactName())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .address(address)
                .taxCode(request.getTaxCode())
                .updatedAt(LocalDateTime.now())
                .supplierStatus(request.getSupplierStatus())
                .build();

        return supplier;
    }
}
