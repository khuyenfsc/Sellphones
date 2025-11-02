package com.sellphones.dto.customer;

import com.sellphones.annotation.ValidPhoneNumber;
import com.sellphones.dto.address.AddressResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order_CustomerInfoRequest {

    private String fullName;

    @ValidPhoneNumber
    private String phoneNumber;

    private AddressResponse address;

    private String note;
}
