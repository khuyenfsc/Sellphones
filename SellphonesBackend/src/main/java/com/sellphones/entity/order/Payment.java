package com.sellphones.entity.order;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.payment.PaymentMethod;
import com.sellphones.entity.payment.PaymentMethodType;
import com.sellphones.entity.payment.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "payment")
public class Payment extends BaseEntity<Long> {

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private String code;

    @Column(name = "txn_ref")
    private String txnRef;

    @Column(precision = 19, scale = 0)
    private BigDecimal amount;

    private LocalDateTime paymentDate;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    @ManyToOne
    @JoinColumn(name = "payment_method_id")
    private PaymentMethod paymentMethod;

}
