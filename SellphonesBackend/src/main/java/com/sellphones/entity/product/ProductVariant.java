package com.sellphones.entity.product;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.inventory.Inventory;
import com.sellphones.entity.promotion.GiftProduct;
import com.sellphones.entity.promotion.ProductPromotion;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "product_variant")
public class ProductVariant extends BaseEntity<Long> {

    @Column(name = "product_variant_name")
    private String productVariantName;

    @Column(nullable = false,precision = 19, scale = 0, name = "root_price")
    private BigDecimal rootPrice;

    @Column(nullable = false,precision = 19, scale = 0, name = "current_price")
    private BigDecimal currentPrice;

    @Enumerated(EnumType.STRING)
    private ProductVariantStatus status;

    @Column(nullable = false, unique = true)
    private String sku;

    @Column(name = "variant_image")
    private String variantImage;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "product_variant_promotion",
            joinColumns = @JoinColumn(name = "product_variant_id"),
            inverseJoinColumns = @JoinColumn(name = "product_promotion_id"))
    private List<ProductPromotion> promotions;

    @ManyToMany
    @JoinTable(name = "product_variant_gift",
            joinColumns = @JoinColumn(name = "product_variant_id"),
            inverseJoinColumns = @JoinColumn(name = "gift_product_id")
    )
    private List<GiftProduct> giftProducts;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "product_variant_attribute_value",
            joinColumns = @JoinColumn(name = "product_variant_id"),
            inverseJoinColumns = @JoinColumn(name = "attribute_value_id")
    )
    private List<AttributeValue> attributeValues;

    @Column(nullable = false)
    private Long stock;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "variant_warranty",
            joinColumns = @JoinColumn(name = "product_variant_id"),
            inverseJoinColumns = @JoinColumn(name = "warranty_id")
    )
    private List<Warranty> warranties;

    @OneToMany(mappedBy = "productVariant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Inventory> inventories;
}
