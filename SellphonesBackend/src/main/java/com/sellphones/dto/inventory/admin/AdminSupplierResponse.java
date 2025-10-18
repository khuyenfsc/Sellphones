package com.sellphones.dto.inventory.admin;

import com.sellphones.dto.address.AddressResponse;
import com.sellphones.entity.inventory.SupplierStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminSupplierResponse {
    private Long id;

    private String name;

    private String contactName;

    private String phoneNumber;

    private String email;

    private AddressResponse address;

    private String taxCode;

    private SupplierStatus supplierStatus;

    private LocalDateTime createdAt;
}
