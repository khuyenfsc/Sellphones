package com.sellphones.entity.product;

import com.sellphones.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "filter_option")
public class FilterOption extends BaseEntity<Long> {

    private String name;

    @Column(name = "filter_condition")
    private String condition;

//    private int sortOrder;

    @ManyToOne
    @JoinColumn(name = "product_filter_id")
    private ProductFilter productFilter;

//    @ManyToOne
//    private Category category;
}
