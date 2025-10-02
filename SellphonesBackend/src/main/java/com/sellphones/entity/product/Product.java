package com.sellphones.entity.product;

import com.sellphones.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product extends BaseEntity<Long> {

    @Column(nullable = false, length = 255)
    private String name; //

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;//

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "min_price", precision = 19, scale = 0)
    private BigDecimal minPrice; //

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductVariant> productVariants = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = true)
    private Brand brand; //

    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> imageUrls;

    @ManyToMany
    @JoinTable(name = "product_category",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_option_value_id")
    )
    private List<CategoryOptionValue> categoryOptionValues;

    @Column(name = "is_featured", nullable = false)
    private Boolean isFeatured = false;

    @Column(name = "is_new")
    private Boolean isNew = true;

    @OneToMany(mappedBy = "product")
    private List<ProductAttributeValue> attributeValues;

//    @OneToMany(mappedBy = "product")
//    private List<ProductAttribute> productAttributes;
}
