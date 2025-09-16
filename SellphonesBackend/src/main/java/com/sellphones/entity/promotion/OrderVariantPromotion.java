package com.sellphones.entity.promotion;

import com.sellphones.entity.order.OrderVariant;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "order_variant_promotion")
public class OrderVariantPromotion extends Promotion{

    @ManyToOne
    @JoinColumn(name = "order_variant_id")
    private OrderVariant orderVariant;

}
