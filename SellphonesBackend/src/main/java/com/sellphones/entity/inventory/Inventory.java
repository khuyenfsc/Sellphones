package com.sellphones.entity.inventory;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.product.ProductVariant;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_variant_id")
    private ProductVariant productVariant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_id", nullable = false)
    private Warehouse warehouse;

    private Long quantity;

}
