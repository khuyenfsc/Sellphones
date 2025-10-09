package com.sellphones.dto.customer;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminCustomerInfoFilterRequest {

    private String email;

    private String name;

    private String phoneNumber;

    private String cccd;

    private String sortType;

    @Min(0)
    private Integer page = 0;

    @Min(1)
    @Max(100)
    private Integer size = 5;
}
