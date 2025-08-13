package com.sellphones.entity.address;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "address")
public class Address extends BaseEntity<Long> {

    @Column(name = "street")
    @NotBlank
    private String street;

    @Column(name = "district")
    @NotBlank
    private String district;

    @Column(name = "province")
    @NotBlank
    private String province;

    @JoinColumn(name = "user_id")
    @NotBlank
    private User user;
}
