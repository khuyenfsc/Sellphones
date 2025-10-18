package com.sellphones.dto.order.admin;

import com.sellphones.entity.order.DeliveryPartner;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminShipmentListResponse {

    private Long id;

    private String code;

    private DeliveryPartner partner;

    private BigDecimal shippingPrice;

    private LocalDate expectedDeliveryDate;

    private LocalDate deliveryDate;

}
