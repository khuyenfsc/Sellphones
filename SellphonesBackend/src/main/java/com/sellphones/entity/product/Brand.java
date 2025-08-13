package com.sellphones.entity.product;

import com.sellphones.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "brand")
public class Brand extends BaseEntity<Long> {

    @Column(nullable = false)
    @NotNull
    private String name;

    private String brandIcon;

    @OneToMany(mappedBy = "brand", cascade = CascadeType.ALL)
    private List<Product> products;
}
