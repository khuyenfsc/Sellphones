package com.sellphones.repository.product;

import com.sellphones.entity.product.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}
