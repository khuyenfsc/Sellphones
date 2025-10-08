package com.sellphones.entity.product;

import com.sellphones.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "product_filter")
public class ProductFilter extends BaseEntity<Long> {

    private String name;

    @ManyToOne
    @JoinColumn(name = "attribute_id", nullable = true)
    private Attribute attribute;

    @OneToMany(mappedBy = "productFilter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FilterOption> filterOptions = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
