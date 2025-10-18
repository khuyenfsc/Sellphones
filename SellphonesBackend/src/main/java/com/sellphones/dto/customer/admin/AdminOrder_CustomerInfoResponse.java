package com.sellphones.dto.customer.admin;

import com.sellphones.dto.address.AddressResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminOrder_CustomerInfoResponse {

    private String fullName;

    private String phoneNumber;

    private AddressResponse address;


}
