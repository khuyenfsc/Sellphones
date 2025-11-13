package com.sellphones.entity.product;

import com.sellphones.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "category")
public class        Category extends BaseEntity<Long> {

    @Column(unique = true)
    private String name;

    @Column(unique = true, nullable = false)
    private String code;

    private String icon;

    @Column(name = "featured_on_homepage")
    private Boolean featuredOnHomepage = false;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category", orphanRemoval = true)
    private List<CategoryOption> categoryOptions = new ArrayList<>();


}
