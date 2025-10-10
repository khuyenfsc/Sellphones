package com.sellphones.repository.product;

import com.sellphones.entity.product.Warranty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Collection;
import java.util.List;

public interface WarrantyRepository extends JpaRepository<Warranty, Long>, JpaSpecificationExecutor<Warranty> {
    List<Warranty> findByIdIn(Collection<Long> warrantyIds);
}
