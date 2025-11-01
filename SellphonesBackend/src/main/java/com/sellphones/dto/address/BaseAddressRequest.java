package com.sellphones.dto.address;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseAddressRequest {

    private String street;

    @NotBlank
    private String ward;

    @NotBlank
    private String district;

    @NotBlank
    private String province;


}
