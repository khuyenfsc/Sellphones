package com.sellphones.entity.product;

import com.sellphones.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "stock_entry")
public class StockEntry extends BaseEntity<Long> {

    @ManyToOne
    @JoinColumn(name = "product_variant_id")
    private ProductVariant productVariant;

    @Column(nullable = false)
    private Long quantity;

    @Column(name = "purchase_price", nullable = false, precision = 19, scale = 0)
    private BigDecimal purchasePrice;

    @Column(name = "import_date")
    private LocalDate importDate;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    private Invwn

}
