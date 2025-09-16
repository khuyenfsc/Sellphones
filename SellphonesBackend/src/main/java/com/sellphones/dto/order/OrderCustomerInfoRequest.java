package com.sellphones.dto.order;

import com.sellphones.annotation.ValidPhoneNumber;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderCustomerInfoRequest{

    private String fullName;

    @ValidPhoneNumber
    private String phoneNumber;

    private OrderAddressRequest address;

    private String note;
}
