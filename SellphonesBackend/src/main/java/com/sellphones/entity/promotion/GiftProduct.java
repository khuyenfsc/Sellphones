package com.sellphones.entity.promotion;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.product.Product;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
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
@Table(name = "gift_product")
public class GiftProduct extends BaseEntity<Long> {

    @NotBlank
    @Column(nullable = false)
    private String name;

    @Min(0)
    @Column(nullable = false)
    private Long stock;

    @NotBlank
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @ManyToMany
    @JoinTable(name = "product_gift",
            joinColumns = @JoinColumn(name = "gift_product_id"),
            inverseJoinColumns = @JoinColumn(name = "product")
    )
    private List<Product> products;
}
