package com.sellphones.entity.product;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.inventory.Warehouse;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.engine.internal.Cascade;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product_variant")
public class ProductVariant extends BaseEntity<Long> {

    @Column(name = "product_variant_name")
    @NotBlank
    private String productVariantName;

    @Column(nullable = false,precision = 19, scale = 0)
    @Min(0)
    private BigDecimal price;

    @Column(nullable = false, unique = true)
    @NotNull
    private String sku;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToMany(mappedBy = "productVariant", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<VariantValue> variantValue = new ArrayList<>();

    @Column(nullable = false)
    @Min(0L)
    private Long stock;

    @OneToMany(mappedBy = "productVariant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WarrantyValue> warranties = new ArrayList<>();

    @OneToMany(mappedBy = "productVariant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Warehouse> wareHouses = new ArrayList<>();
}
