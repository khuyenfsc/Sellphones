package com.sellphones.repository.product;

import com.sellphones.entity.product.ProductStatus;
import com.sellphones.entity.product.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long>, JpaSpecificationExecutor<ProductVariant> {
    List<ProductVariant> findTop5ByOrderByStockDesc();
    boolean existsByIdAndStatus(Long id, ProductStatus status);
    Optional<ProductVariant> findByIdAndStatus(Long id, ProductStatus status);
}
