package com.sellphones.repository.inventory;

import com.sellphones.entity.inventory.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Long>, JpaSpecificationExecutor<Inventory> {
    @Query("""
        SELECT COALESCE(SUM(i.quantity), 0)
        FROM Inventory i
        WHERE i.productVariant.id = :productVariantId
    """)
    Long sumQuantityByProductVariantId(@Param("productVariantId") Long productVariantId);

    @Modifying
    @Query("""
        UPDATE Inventory i
        SET i.quantity = i.quantity + :delta
        WHERE i.id = :inventoryId
          AND i.quantity + :delta >= 0
    """)
    int safeIncreaseQuantity(@Param("inventoryId") Long inventoryId, @Param("delta") long delta);


    List<Inventory> findByIdIn(Collection<Long> ids);
}
