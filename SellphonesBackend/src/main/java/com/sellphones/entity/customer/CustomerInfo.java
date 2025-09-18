package com.sellphones.entity.customer;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.installment.InstallmentOrder;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "customer_info")
public class CustomerInfo extends BaseEntity<Long> {

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String phoneNumber;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    @Nullable
    private String cccd;

    @Nullable
    private LocalDate dateOfBirth;
//
//    @OneToOne(mappedBy = "customerInfo")
//    private InstallmentOrder installmentOrder;
}
