package com.sellphones.dto.product.admin;

import com.sellphones.dto.address.AdminAddressResponse;
import com.sellphones.entity.product.SupplierStatus;
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

    private AdminAddressResponse address;

    private String taxCode;

    private SupplierStatus supplierStatus;

    private LocalDateTime createdAt;
}
