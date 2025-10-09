package com.sellphones.repository.product;

import com.sellphones.entity.product.StockEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface StockEntryRepository extends JpaRepository<StockEntry, Long>, JpaSpecificationExecutor<StockEntry> {
}
