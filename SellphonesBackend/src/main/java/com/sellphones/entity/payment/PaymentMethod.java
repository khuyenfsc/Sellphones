package com.sellphones.entity.payment;


import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.order.Order;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "payment_method")
public class PaymentMethod extends BaseEntity<Long> {

    @NotBlank
    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private PaymentMethodType paymentMethodType;

    @OneToMany(mappedBy = "payment_method_id")
    private List<Order> orders;
}
