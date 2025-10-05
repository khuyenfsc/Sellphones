package com.sellphones.repository.product;

import com.sellphones.entity.product.AttributeValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Collection;
import java.util.List;

public interface AttributeValueRepository extends JpaRepository<AttributeValue, Long>, JpaSpecificationExecutor<AttributeValue> {
    List<AttributeValue> findByIdIn(Collection<Long> attributeValueIds);
}
