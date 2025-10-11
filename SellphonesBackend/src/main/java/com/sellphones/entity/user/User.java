package com.sellphones.entity.user;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.sellphones.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;


@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "app_user")
public class User extends BaseEntity<Long> {

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "date_of_birth")
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate dateOfBirth;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "default_address_id")
//    private Address defaultAddress;
//
//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user", orphanRemoval = true)
//    private List<Address> shippingAddresses;

//    @Enumerated(EnumType.STRING)
//    @Column(name = "role")
//    private Role role;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private Provider provider;

}
