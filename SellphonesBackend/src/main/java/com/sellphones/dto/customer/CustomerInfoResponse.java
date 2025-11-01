package com.sellphones.dto.customer;

import com.sellphones.dto.address.AddressResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerInfoResponse {

    private Long id;

    private String fullName;

    private String phoneNumber;

    private AddressResponse address;

    private LocalDate dateOfBirth;
}
