package com.sellphones.dto.address;

import com.sellphones.entity.address.AddressType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminAddressRequest {

    private String street;

    @NotBlank
    private String ward;

    @NotBlank
    private String district;

    @NotBlank
    private String province;

    @NotNull
    private AddressType addressType;

}
