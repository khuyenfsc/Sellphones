package com.sellphones.dto.customer.admin;

import com.sellphones.dto.address.AddressResponse;
import com.sellphones.dto.user.admin.AdminCustomerInfo_UserResponse;
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

    private AddressResponse address;

    private String cccd;

    private LocalDate dateOfBirth;

}
