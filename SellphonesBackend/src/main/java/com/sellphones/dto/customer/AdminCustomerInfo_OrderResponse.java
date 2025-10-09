package com.sellphones.dto.customer;

import com.sellphones.dto.address.AdminAddressResponse;
import com.sellphones.entity.address.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminCustomerInfo_OrderResponse {

    private String fullName;

    private String phoneNumber;

    private AdminAddressResponse address;


}
