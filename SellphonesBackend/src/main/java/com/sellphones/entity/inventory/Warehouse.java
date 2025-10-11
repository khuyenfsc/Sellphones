package com.sellphones.entity.inventory;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.address.Address;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "warehouse")
public class Warehouse extends BaseEntity<Long> {

    private String name;

    @OneToOne
    @JoinColumn(name = "address_id", unique = true, nullable = false)
    private Address address;
}
