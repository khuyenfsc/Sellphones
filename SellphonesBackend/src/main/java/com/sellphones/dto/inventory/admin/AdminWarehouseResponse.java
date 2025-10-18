package com.sellphones.dto.inventory.admin;

import com.sellphones.dto.address.AddressResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminWarehouseResponse {
    private Long id;

    private String name;

    private AddressResponse address;
}
