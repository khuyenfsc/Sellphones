package com.sellphones.repository.product;

import com.sellphones.entity.product.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product>{

    List<Product> findFirst10ByCategoryIdAndIsFeatured(Long id, Boolean isFeatured);

    @Transactional
    @Modifying
    @Query(
            value = "UPDATE product SET category_id = NULL WHERE category_id = :categoryId",
            nativeQuery = true
    )
    void detachCategoryFromProducts(@Param("categoryId") Long categoryId);

}
