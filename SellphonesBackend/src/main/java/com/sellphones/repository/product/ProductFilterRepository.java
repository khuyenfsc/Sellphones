package com.sellphones.repository.product;

import com.sellphones.entity.product.ProductFilter;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductFilterRepository extends JpaRepository<ProductFilter, Long> {
    @Transactional
    @Modifying
    @Query(value = "UPDATE product_filter SET attribute_id = NULL WHERE attribute_id = :attributeId", nativeQuery = true)
    void detachAttributeNative(@Param("attributeId") Long attributeId);
}
