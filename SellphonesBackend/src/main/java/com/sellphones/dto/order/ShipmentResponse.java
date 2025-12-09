package com.sellphones.dto.order;

import com.sellphones.entity.order.DeliveryPartner;
import com.sellphones.entity.order.ShipmentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class ShipmentResponse {
    private Long id;

    private String code;

    private DeliveryPartner deliveryPartner;

    private ShipmentStatus status;

    private LocalDate expectedDeliveryDate;

    private LocalDate deliveryDate;

}
