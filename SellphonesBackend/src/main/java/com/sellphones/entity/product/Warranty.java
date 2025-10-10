package com.sellphones.entity.product;

import com.sellphones.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "warranty")
public class Warranty extends BaseEntity<Long> {

    private String name;

    private Integer months;

    @Column(precision = 19, scale = 0)
    private BigDecimal price;

    @Column(columnDefinition = "TEXT")
    private String description;
}
