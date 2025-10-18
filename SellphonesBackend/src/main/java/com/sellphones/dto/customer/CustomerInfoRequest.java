package com.sellphones.dto.customer;

import com.sellphones.dto.address.AddressRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerInfoRequest {
    @NotBlank
    private String fullName;

    @NotBlank
    private String phoneNumber;

    @NotNull
    private AddressRequest address;

    private LocalDate dateOfBirth;
}
