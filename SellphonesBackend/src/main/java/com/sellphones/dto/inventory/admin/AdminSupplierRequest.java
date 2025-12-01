package com.sellphones.dto.inventory.admin;

import com.sellphones.dto.address.AddressRequest;
import com.sellphones.entity.inventory.SupplierStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminSupplierRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String contactName;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    @Email
    private String email;
    
    @NotNull
    private AddressRequest address;

    @NotBlank
    private String taxCode;

    @NotNull
    private SupplierStatus status;

}
