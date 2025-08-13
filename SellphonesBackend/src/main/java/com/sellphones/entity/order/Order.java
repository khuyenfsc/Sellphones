package com.sellphones.entity.order;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.customer.CustomerInfo;
import com.sellphones.entity.payment.PaymentMethod;
import com.sellphones.entity.payment.PaymentStatus;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order")
public class Order extends BaseEntity<Long> {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order")
    private List<OrderVariant> orderVariants;

    private LocalDateTime orderedAt;

    @Column(precision = 19, scale = 0)
    private BigDecimal price;

    @Column(name = "order_status", nullable = false)
    private int orderStatus;

    @ManyToOne
    @JoinColumn(name = "payment_method_id")
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus;

    @OneToOne
    @JoinColumn(name = "customer_info_id")
    private CustomerInfo customerInfo;

}
