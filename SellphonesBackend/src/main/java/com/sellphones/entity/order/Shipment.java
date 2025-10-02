package com.sellphones.entity.order;

import com.sellphones.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.*;

import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "shipments")
public class Shipment extends BaseEntity<Long> {

    private String code;

    private DeliveryPartner deliveryPartner;

    private BigDecimal shippingPrice;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
