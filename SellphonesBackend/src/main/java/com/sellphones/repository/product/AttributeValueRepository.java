package com.sellphones.repository.product;

import com.sellphones.entity.product.ProductAttributeValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AttributeValueRepository extends JpaRepository<ProductAttributeValue, Long>, JpaSpecificationExecutor<ProductAttributeValue> {
}
