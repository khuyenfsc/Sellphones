package com.sellphones.entity.customer;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.installment.InstallmentOrder;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customer_info")
public class CustomerInfo extends BaseEntity<Long> {

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "customer_info_id")
    private Address address;

    @Nullable
    private String cccd;

    @Nullable
    private LocalDate dateOfBirth;

    private InstallmentOrder installmentOrder;
}
