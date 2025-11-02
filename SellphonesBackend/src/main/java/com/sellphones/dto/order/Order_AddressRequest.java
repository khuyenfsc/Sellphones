package com.sellphones.dto.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order_AddressRequest {

    private String street;

    private String ward;

    private String district;

    private String province;


}
