//package com.sellphones.entity.product;
//
//import com.sellphones.entity.BaseEntity;
//import jakarta.persistence.*;
//import jakarta.validation.constraints.Min;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.EqualsAndHashCode;
//import lombok.NoArgsConstructor;
//
//import java.math.BigDecimal;
//
//@EqualsAndHashCode(callSuper = true)
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//@Table(name = "warranty_value")
//public class WarrantyValue extends BaseEntity<Long> {
//
//    @ManyToOne
//    @JoinColumn(name = "warranty_id")
//    private Warranty warranty;
//
//    @Column(precision = 19, scale = 0)
//    private BigDecimal val;
//
//    @ManyToOne
//    @JoinColumn(name = "product_variant_id")
//    private ProductVariant productVariant;
//}
