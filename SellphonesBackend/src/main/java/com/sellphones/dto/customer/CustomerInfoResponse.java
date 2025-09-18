package com.sellphones.dto.customer;

import com.sellphones.entity.address.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerInfoResponse {

    private String fullName;

    private String phoneNumber;

    private Address address;


}
