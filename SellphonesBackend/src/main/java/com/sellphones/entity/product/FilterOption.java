package com.sellphones.entity.product;

import com.sellphones.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "filter_option")
public class FilterOption extends BaseEntity<Long> {

    private String name;

    private String condition;

    private int sortOrder;

    @ManyToOne
    @JoinColumn(name = "product_filter_id")
    private ProductFilter productFilter;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
