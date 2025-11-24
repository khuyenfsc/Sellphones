package com.sellphones.repository.product;

import com.sellphones.entity.product.Warranty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface WarrantyRepository extends JpaRepository<Warranty, Long>, JpaSpecificationExecutor<Warranty> {
    List<Warranty> findByIdIn(Collection<Long> warrantyIds);

    @Query("""
        SELECT pv.id, w
        FROM ProductVariant pv
        JOIN pv.warranties w
        WHERE pv.id IN :variantIds
    """)
    List<Object[]> findByProductVariantIds(@Param("variantIds") Collection<Long> variantIds);
}
