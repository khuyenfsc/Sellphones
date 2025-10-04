package com.sellphones.repository.product;

import com.sellphones.entity.product.ProductAttributeValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface AttributeValueRepository extends JpaRepository<ProductAttributeValue, Long>, JpaSpecificationExecutor<ProductAttributeValue> {
    List<ProductAttributeValue> findByIdIn(List<Long> attributeValueIds);
}
