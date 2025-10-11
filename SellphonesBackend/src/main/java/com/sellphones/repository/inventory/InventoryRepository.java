package com.sellphones.repository.inventory;

import com.sellphones.entity.inventory.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InventoryRepository extends JpaRepository<Inventory, Long>, JpaSpecificationExecutor<Inventory> {
    @Query("""
        SELECT COALESCE(SUM(i.quantity), 0)
        FROM Inventory i
        WHERE i.productVariant.id = :productVariantId
    """)
    Long sumQuantityByProductVariantId(@Param("productVariantId") Long productVariantId);
}
