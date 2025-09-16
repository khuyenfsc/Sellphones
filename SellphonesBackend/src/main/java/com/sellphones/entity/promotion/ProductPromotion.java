package com.sellphones.entity.promotion;

import com.sellphones.entity.product.ProductVariant;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product_promotion")
public class ProductPromotion extends Promotion{

    @ManyToMany
    @JoinTable(name = "product_variant_promotion",
            joinColumns = @JoinColumn(name = "product_promotion_id"),
            inverseJoinColumns = @JoinColumn(name = "product_variant_id"))
    private List<ProductVariant> productVariants;


}
