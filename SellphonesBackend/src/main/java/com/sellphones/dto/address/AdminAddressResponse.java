package com.sellphones.dto.address;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminAddressResponse {

    private Long id;

    private String street;

    private String ward;

    private String district;

    private String province;

}
