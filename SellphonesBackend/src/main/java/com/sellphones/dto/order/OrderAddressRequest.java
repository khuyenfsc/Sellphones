package com.sellphones.dto.order;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderAddressRequest {

    private String street;

    private String ward;

    private String district;

    private String province;


}
