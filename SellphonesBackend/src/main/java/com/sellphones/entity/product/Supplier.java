package com.sellphones.entity.product;

import com.sellphones.annotation.ValidPhoneNumber;
import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.address.Address;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "supplier")
public class Supplier extends BaseEntity<Long> {

    @NotBlank
    @Column(nullable = false)
    private String name;

    @NotBlank
    @Column(nullable = false, name = "contact_name")
    private String contactName;

    @NotBlank
    @Column(nullable = false, name = "phone_number")
    @ValidPhoneNumber
    private String phoneNumber;

    @Email
    @NotBlank
    private String email;

    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @NotBlank
    @Column(name = "tax_code", nullable = false)
    private String taxCode;

    @NotNull
    @Column(name = "supplier_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private SupplierStatus supplierStatus;

    @NotNull
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @NotNull
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
