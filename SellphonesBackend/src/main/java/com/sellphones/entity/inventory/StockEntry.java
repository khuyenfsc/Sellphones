package com.sellphones.entity.inventory;

import com.sellphones.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true,  exclude = {"supplier", "inventory"})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "stock_entry")
public class StockEntry extends BaseEntity<Long> {

    @Column(nullable = false)
    private Long quantity;

    @Column(name = "purchase_price", nullable = false, precision = 19, scale = 0)
    private BigDecimal purchasePrice;

    @Column(name = "import_date")
    private LocalDate importDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "warehouse_id")
//    private Warehouse warehouse;

//    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inventory_id")
    @ManyToOne
    private Inventory inventory;

}
