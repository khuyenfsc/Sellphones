package com.sellphones.entity.installment;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.customer.CustomerInfo;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "installment_order")
public class InstallmentOrder extends BaseEntity<Long> {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_variant_id")
    private ProductVariant productVariant;

    @OneToOne
    @JoinColumn(name = "customer_info_id")
    private CustomerInfo customerInfo;

    @ManyToOne
    @JoinColumn(name = "installment_plan_id")
    private InstallmentPlan installmentPlan;

    @Column(name = "created_at", nullable = false)
    private LocalDate createdAt;

    @Column(name = "total_amount", nullable = false, precision = 19, scale = 0)
    @Min(0)
    private BigDecimal totalAmount;

    @Column(name = "down_payment", nullable = false, precision = 19, scale = 0)
    @Min(0)
    private BigDecimal downPayment;

    @Column(name = "monthly_payment", nullable = false, precision = 19, scale = 0)
    @Min(0)
    private BigDecimal monthlyPayment;

    @Column(name = "installment_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private InstallmentStatus installmentStatus;
}
