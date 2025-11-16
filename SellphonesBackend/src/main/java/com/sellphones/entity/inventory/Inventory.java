package com.sellphones.entity.inventory;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.product.ProductVariant;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true, exclude = {"productVariant", "warehouse"})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(
        name = "inventory",
        indexes = {
                @Index(name = "idx_inventory_product_variant", columnList = "product_variant_id"),
                @Index(name = "idx_inventory_warehouse", columnList = "warehouse_id")
        },
        uniqueConstraints = @UniqueConstraint(columnNames = {"product_variant_id", "warehouse_id"})
)
public class Inventory extends BaseEntity<Long> {

//    @ManyToOne(fetch = FetchType.LAZY)
    @ManyToOne
    @JoinColumn(name = "product_variant_id")
    private ProductVariant productVariant;

//    @ManyToOne(fetch = FetchType.LAZY)
    @ManyToOne
    @JoinColumn(name = "warehouse_id", nullable = false)
    private Warehouse warehouse;

    @OneToMany(mappedBy = "inventory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StockEntry> stockEntries;

    private Long quantity;

}
