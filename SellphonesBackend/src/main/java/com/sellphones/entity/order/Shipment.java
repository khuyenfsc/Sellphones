package com.sellphones.entity.order;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.inventory.Inventory;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "shipment")
public class Shipment extends BaseEntity<Long> {

    private String code;

    @Enumerated(EnumType.STRING)
    private DeliveryPartner partner;

    private BigDecimal shippingPrice;

    private LocalDate expectedDeliveryDate;

    private LocalDate deliveryDate;

    @Enumerated(EnumType.STRING)
    private ShipmentStatus status;

    @ManyToMany
    @JoinTable(
        name = "shipment_inventory",
        joinColumns = @JoinColumn(name = "shipment_id"),
        inverseJoinColumns = @JoinColumn(name = "inventory_id")
    )
    private List<Inventory> inventories = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address pickupAddress;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
