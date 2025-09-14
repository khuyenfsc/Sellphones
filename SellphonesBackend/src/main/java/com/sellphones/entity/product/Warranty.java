package com.sellphones.entity.product;

import com.sellphones.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
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
@Table(name = "warranty")
public class Warranty extends BaseEntity<Long> {

    private String name;

    private int numberOfMonths;

    @Column(precision = 19, scale = 0)
    private BigDecimal val;

    @Column(columnDefinition = "TEXT")
    private String description;
}
