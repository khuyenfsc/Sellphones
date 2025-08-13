package com.sellphones.entity.user;

import com.sellphones.annotation.StrongPassword;
import com.sellphones.annotation.ValidPhoneNumber;
import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.address.Address;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User extends BaseEntity<Long> {

    @Column(name = "email", unique = true)
    @Email
    private String email;

    @Column(name = "password")
    @NotBlank
    @StrongPassword
    private String password;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "phone_number", unique = true)
    @ValidPhoneNumber
    private String phoneNumber;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "default_address_id", referencedColumnName = "id")
    private Address defaultAddress;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<Address> shippingAddresses;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    @NotNull
    private Gender gender;

}
