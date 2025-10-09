package com.sellphones.entity.address;

import com.sellphones.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "address")
public class Address extends BaseEntity<Long> {

    private String street;

    private String ward;

    private String district;

    private String province;

    @Column(name = "address_type")
    @Enumerated(EnumType.STRING)
    private AddressType addressType;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;

}

