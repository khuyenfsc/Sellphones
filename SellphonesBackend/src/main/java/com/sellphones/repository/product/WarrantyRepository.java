package com.sellphones.repository.product;

import com.sellphones.entity.product.Warranty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WarrantyRepository extends JpaRepository<Warranty, Long> {
}
