package com.sellphones.repository.product;

import com.sellphones.entity.product.ProductStatus;
import com.sellphones.entity.product.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long>, JpaSpecificationExecutor<ProductVariant> {
    List<ProductVariant> findTop5ByOrderByStockDesc();
    boolean existsByIdAndStatus(Long id, ProductStatus status);
    Optional<ProductVariant> findByIdAndStatus(Long id, ProductStatus status);

    @Modifying
    @Query("UPDATE ProductVariant pv SET pv.stock = pv.stock - :qty WHERE pv.id = :id AND pv.stock >= :qty")
    int deductStock(@Param("id") Long id, @Param("qty") Long qty);
}
