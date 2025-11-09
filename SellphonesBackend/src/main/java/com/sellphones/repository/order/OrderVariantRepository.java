package com.sellphones.repository.order;

import com.sellphones.entity.order.OrderStatus;
import com.sellphones.entity.order.OrderVariant;
import com.sellphones.entity.product.ProductVariant;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderVariantRepository extends JpaRepository<OrderVariant, Long> {
    List<OrderVariant> findByOrder_User_EmailAndProductVariant_Id(String email, Long id);

    @Query("""
    SELECT COUNT(ov)
    FROM OrderVariant ov
    WHERE ov.productVariant.id = :variantId
      AND ov.order.user.email = :email
      AND ov.order.orderStatus = :status
""")
    long countUserPurchasedVariant(
            @Param("email") String email,
            @Param("variantId") Long variantId,
            @Param("status") OrderStatus status
    );

    @Query("""
        SELECT pv
        FROM OrderVariant ov
        JOIN ov.productVariant pv
        JOIN ov.order o
        WHERE o.orderedAt BETWEEN :start AND :end
        GROUP BY pv
        ORDER BY SUM(ov.quantity) DESC
    """)
    List<ProductVariant> getMostSellingVariant(@Param("start") LocalDateTime start,
                                               @Param("end") LocalDateTime end,
                                               Pageable pageable);

}
