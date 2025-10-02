package com.sellphones.entity.product;

import com.sellphones.entity.BaseEntity;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
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
@Table(name = "product_attribute_value")
public class ProductAttributeValue extends BaseEntity<Long> {

    @Column(name = "str_val")
    private String strVal;

    @Column(name = "numeric_val")
    private BigDecimal numericVal;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Nullable
    @ManyToOne
    @JoinColumn(name = "product_variant_id")
    private ProductVariant productVariant;

    @ManyToOne
    @JoinColumn(name = "attribute_id")
    private Attribute attribute;

}
