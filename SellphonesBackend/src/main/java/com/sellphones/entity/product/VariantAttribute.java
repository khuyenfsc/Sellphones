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
@Table(name = "variant_value")
public class VariantAttribute extends BaseEntity<Long> {

    private String val;

    @ManyToOne
    @JoinColumn(name = "áttribute_id") //Cần thêm hàm merge để xác định xem có override lại giá trị các attribute trùng
    private Attribute attribute;

    @ManyToOne
    @JoinColumn(name = "product_variant_id")
    private ProductVariant productVariant;

}
