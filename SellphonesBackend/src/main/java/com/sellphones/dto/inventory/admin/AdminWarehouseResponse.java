package com.sellphones.dto.inventory.admin;

import com.sellphones.dto.address.AdminAddressResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminWarehouseResponse {
    private Long id;

    private String name;

    private AdminAddressResponse address;
}
