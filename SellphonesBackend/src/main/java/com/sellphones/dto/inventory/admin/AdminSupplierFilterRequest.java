package com.sellphones.dto.inventory.admin;

import com.sellphones.entity.inventory.SupplierStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminSupplierFilterRequest {

    private String name;

    private String contactName;

    private String phoneNumber;

    private String email;

    private String taxCode;

    private SupplierStatus supplierStatus;

    private String sortType;

    @Min(0)
    private Integer page = 0;

    @Min(1)
    @Max(100)
    private Integer size = 5;
}
