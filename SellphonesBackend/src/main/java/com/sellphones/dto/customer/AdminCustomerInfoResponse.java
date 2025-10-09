package com.sellphones.dto.customer;

import com.sellphones.dto.address.AdminAddressResponse;
import com.sellphones.dto.user.admin.AdminCustomerInfo_UserResponse;
import com.sellphones.entity.address.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminCustomerInfoResponse {

    private Long id;

    private AdminCustomerInfo_UserResponse user;

    private String fullName;

    private String phoneNumber;

    private AdminAddressResponse address;

    private String cccd;

    private LocalDate dateOfBirth;

}
