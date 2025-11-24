package com.sellphones.entity.cart;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.product.Warranty;
import com.sellphones.entity.promotion.ProductPromotion;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "cart_item")
public class CartItem extends BaseEntity<Long> {

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_variant_id")
    private ProductVariant productVariant;

//    @ManyToOne
//    @JoinColumn(name = "warranty_id")
//    private Warranty warranty;
//
//    @ManyToMany
//
//    private List<ProductPromotion> promotions = new ArrayList<>();

    @Column(nullable = false)
    private Long quantity;

    @Column(nullable = false)
    private LocalDateTime addedAt;
}
