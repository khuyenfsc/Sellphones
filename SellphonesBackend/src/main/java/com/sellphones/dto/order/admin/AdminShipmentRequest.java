package com.sellphones.dto.order.admin;

import com.sellphones.dto.address.AddressRequest;
import com.sellphones.entity.order.DeliveryPartner;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminShipmentRequest {

    private String code;

    private DeliveryPartner partner;

    private LocalDate expectedDeliveryDate;

    private Map<Long, Map<String, Long>> inventoryItems;

    private AddressRequest address;

    private BigDecimal shippingPrice;

}
