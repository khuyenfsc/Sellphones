package com.sellphones.repository.product;

import com.sellphones.entity.product.Product;
import com.sellphones.entity.product.ProductStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product>{

    List<Product> findFirst10ByCategory_NameAndIsFeaturedAndStatus(String categoryName, Boolean isFeatured, ProductStatus status);

    Optional<Product> findByIdAndStatus(Long id, ProductStatus status);

    boolean existsByIdAndStatus(Long productId, ProductStatus status);

    @Transactional
    @Modifying
    @Query(
            value = "UPDATE product SET category_id = NULL WHERE category_id = :categoryId",
            nativeQuery = true
    )
    void detachCategoryFromProducts(@Param("categoryId") Long categoryId);

    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.productVariants WHERE p.id = :id")
    Optional<Product> findByIdWithVariants(@Param("id") Long id);

}
