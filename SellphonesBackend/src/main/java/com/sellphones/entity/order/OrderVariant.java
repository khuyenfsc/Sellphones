package com.sellphones.entity.order;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.product.WarrantyValue;
import com.sellphones.entity.promotion.Promotion;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_variant")
public class OrderVariant extends BaseEntity<Long> {

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_variant_id")
    private ProductVariant productVariant;

    @Min(0)
    @Column(nullable = false)
    private Long quantity;

    @Column(nullable = false)
    private LocalDateTime addedAt;

    @ManyToOne
    @JoinColumn(name = "warranty_value_id")
    private WarrantyValue warrantyValue;

    @OneToMany(mappedBy = "orderVariant")
    private List<Promotion> promotions;
}
