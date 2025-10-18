package com.sellphones.dto.order.admin;

import com.sellphones.dto.address.AddressResponse;
import com.sellphones.entity.order.DeliveryPartner;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminShipmentDetailsResponse {

    private Long id;

    private String code;

    private DeliveryPartner deliveryPartner;

    private LocalDate expectedDeliveryDate;

    private LocalDate deliveryDate;

    private AddressResponse pickupAddress;

    private AdminShipment_OrderResponse order;
}
