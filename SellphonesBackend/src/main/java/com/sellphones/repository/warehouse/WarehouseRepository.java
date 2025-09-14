package com.sellphones.repository.warehouse;

import com.sellphones.entity.inventory.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
}
