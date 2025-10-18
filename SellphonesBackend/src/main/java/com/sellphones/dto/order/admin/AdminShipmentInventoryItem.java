package com.sellphones.dto.order.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminShipmentInventoryItem {

    private Long inventoryId;

    private Long quantity;

}
