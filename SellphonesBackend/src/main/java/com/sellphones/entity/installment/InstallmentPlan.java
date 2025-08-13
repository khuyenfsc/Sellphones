package com.sellphones.entity.installment;

import com.sellphones.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "installment_plan")
public class InstallmentPlan extends BaseEntity<Long> {

    @NotBlank
    @Column(nullable = false)
    private String name;

    @Min(1)
    @Column(name = "duration_month", nullable = false)
    private int durationMonths;

    @Min(0)
    @Column(name = "interest_rate", precision = 3, scale = 1)
    private BigDecimal interestRate;

    @ManyToOne
    @JoinColumn(name = "installment_provider_id")
    private InstallmentProvider installmentProvider;
}
