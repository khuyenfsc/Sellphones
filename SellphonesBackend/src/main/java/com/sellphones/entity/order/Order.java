package com.sellphones.entity.order;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.customer.CustomerInfo;
import com.sellphones.entity.payment.PaymentMethod;
import com.sellphones.entity.payment.PaymentStatus;
import com.sellphones.entity.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@SuperBuilder
@Table(name = "customer_order")
public class Order extends BaseEntity<Long> {

    private String code;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "order_id")
    private List<OrderVariant> orderVariants;

    private LocalDateTime orderedAt;

    @CreatedBy
    @Column(updatable = false)
    private String createBy;

    @Column(precision = 19, scale = 0)
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status", nullable = false)
    private OrderStatus orderStatus;

    @OneToOne(mappedBy = "order", cascade = CascadeType.PERSIST)
    private Payment payment;

//    @ManyToOne
//    @JoinColumn(name = "payment_method_id")
//    private PaymentMethod paymentMethod;
//
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private PaymentStatus paymentStatus;

    private String note;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_info_id")
    private CustomerInfo customerInfo;

    @OneToOne(mappedBy = "order")
    private Shipment shipment;

    @PostPersist
    public void generateCode(){
        this.code = "SPS" + this.getId();
    }

}
