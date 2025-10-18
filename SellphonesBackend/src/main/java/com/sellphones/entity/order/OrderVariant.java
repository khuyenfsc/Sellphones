package com.sellphones.entity.order;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.product.Warranty;
import com.sellphones.entity.promotion.OrderVariantPromotion;
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
@Table(name = "order_variant")
public class OrderVariant extends BaseEntity<Long> {

//    @ManyToOne
//    @JoinColumn(name = "order_id")
//    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_variant_id")
    private ProductVariant productVariant;

    @Column(nullable = false)
    private Long quantity;

    @Column(nullable = false)
    private LocalDateTime addedAt;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @ManyToOne
    @JoinColumn(name = "warranty_id")
    private Warranty warranty;

    @OneToMany(mappedBy = "orderVariant", cascade = CascadeType.PERSIST)
    private List<OrderVariantPromotion> promotions;

}
