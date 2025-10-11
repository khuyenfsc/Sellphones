package com.sellphones.repository.inventory;

import com.sellphones.entity.inventory.StockEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StockEntryRepository extends JpaRepository<StockEntry, Long>, JpaSpecificationExecutor<StockEntry> {
    @Query(
            """
                SELECT COALESCE(SUM(se.quantity), 0)
                FROM StockEntry se
                WHERE se.inventory.id = :inventoryId
            """
    )
    Long sumQuantityByInventory(@Param("inventoryId") Long inventoryId);

    void deleteByInventory_Id(Long inventoryId);
}
