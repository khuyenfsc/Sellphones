package com.sellphones.entity.address;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "address")
public class Address extends BaseEntity<Long> {

    private String street;

    private String ward;

    private String district;

    private String province;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;

}

