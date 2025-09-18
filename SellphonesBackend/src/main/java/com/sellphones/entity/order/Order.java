package com.sellphones.entity.order;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.customer.CustomerInfo;
import com.sellphones.entity.payment.PaymentMethod;
import com.sellphones.entity.payment.PaymentStatus;
import com.sellphones.entity.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "customer_order")
public class Order extends BaseEntity<Long> {

    private String code;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.PERSIST)
    private List<OrderVariant> orderVariants;

    private LocalDateTime orderedAt;

    @Column(precision = 19, scale = 0)
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status", nullable = false)
    private OrderStatus orderStatus;

    @ManyToOne
    @JoinColumn(name = "payment_method_id")
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus;

    private String note;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_info_id")
    private CustomerInfo customerInfo;

    @PostPersist
    public void generateCode(){
        this.code = "SPS" + this.getId();
    }

}
