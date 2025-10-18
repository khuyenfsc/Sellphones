package com.sellphones.dto.order.admin;

import com.sellphones.entity.order.DeliveryPartner;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminShipmentRequest {

    private String code;

    private DeliveryPartner partner;

    private LocalDate expectedDeliveryDate;

    private List<AdminShipmentInventoryItem> inventoryItems;

    private Long pickupAddressId;

    private Long shippingPrice;

}
