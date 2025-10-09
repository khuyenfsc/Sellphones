package com.sellphones.dto.address;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminAddressFilterRequest {

    private String street;

    private String ward;

    private String district;

    private String province;

    private String sortType;

    @Min(0)
    private Integer page = 0;

    @Min(1)
    @Max(100)
    private Integer size = 5;
}
