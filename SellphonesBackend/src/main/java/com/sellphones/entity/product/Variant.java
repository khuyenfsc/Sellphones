//package com.sellphones.entity.product;
//
//import com.sellphones.entity.BaseEntity;
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Entity;
//import jakarta.persistence.OneToMany;
//import jakarta.persistence.Table;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.NotNull;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.EqualsAndHashCode;
//import lombok.NoArgsConstructor;
//
//import java.util.List;
//
//@EqualsAndHashCode(callSuper = true)
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//@Table(name = "variant")
//public class Variant extends BaseEntity<Long> {
//
//    private String name;
//
//    @OneToMany(mappedBy = "variant", cascade = CascadeType.ALL)
//    private List<VariantValue> values;
//}
