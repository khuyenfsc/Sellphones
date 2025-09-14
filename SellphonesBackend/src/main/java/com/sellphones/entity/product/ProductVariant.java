package com.sellphones.entity.product;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.inventory.Inventory;
import com.sellphones.entity.promotion.ProductPromotion;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product_variant")
public class ProductVariant extends BaseEntity<Long> {

    @Column(name = "product_variant_name")
    private String productVariantName;

    @Column(nullable = false,precision = 19, scale = 0)
    private BigDecimal price;

    @Column(nullable = false, unique = true)
    private String sku;

    @Column(name = "variant_image")
    private String variantImage;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "productVariant")
    private List<ProductPromotion> promotions;

    @OneToMany(mappedBy = "productVariant", cascade = CascadeType.ALL)
    private List<ProductAttributeValue> attributeValues;

    @Column(nullable = false)
    private Long stock;

    @ManyToMany
    @JoinTable(
            name = "variant_warranty",
            joinColumns = @JoinColumn(name = "product_variant_id"),
            inverseJoinColumns = @JoinColumn(name = "warranty_id")
    )
    private List<Warranty> warranties;

    @OneToMany(mappedBy = "productVariant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Inventory> inventories;
}
