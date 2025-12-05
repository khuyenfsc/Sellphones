package com.sellphones.repository.order;

import com.sellphones.entity.order.Order;

import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {
    Optional<Order> findByUser_EmailAndId(String email, Long id);
    long countByUser_Email(String email);
    long countByOrderedAtBetween(LocalDateTime start, LocalDateTime end);

    @Query("""
        SELECT COUNT(o)
        FROM Order o
        WHERE o.orderedAt BETWEEN :start AND :end
            AND o.payment.status <> 'COMPLETED'
    """)
    long countUnpaidOrders(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("""
        SELECT u,
                COALESCE(SUM(p.amount), 0) AS totalSales
        FROM Order o
        JOIN  o.user u
        JOIN o.payment p
        WHERE p.paymentDate BETWEEN :start AND :end
        GROUP BY u
        ORDER BY totalSales DESC
    """)
    List<Object[]> findTopCustomerByTotalSales(@Param("start") LocalDateTime start,
                                               @Param("end") LocalDateTime end,
                                               Pageable pageable);

    @Query("""
        SELECT DAY(o.orderedAt) AS orderDay,
               COUNT(o.id) AS totalOrders
        FROM Order o
        WHERE o.orderedAt BETWEEN :start AND :end
        GROUP BY DAY(o.orderedAt)
        ORDER BY DAY(o.orderedAt)
    """)
    List<Object[]> countOrdersByDayInMonth(@Param("start") LocalDateTime start,
                                           @Param("end") LocalDateTime end);


    @Query("""
        SELECT MONTH(o.orderedAt) AS orderMonth,
               COUNT(o.id) AS totalOrders
        FROM Order o
        WHERE YEAR(o.orderedAt) = :year
        GROUP BY MONTH(o.orderedAt)
        ORDER BY MONTH(o.orderedAt)
    """)
    List<Object[]> countOrdersByMonthInYear(@Param("year") Integer year);

    @Modifying
    @Query("""
        UPDATE Order o
        SET o.orderStatus = 'SHIPPING'
        WHERE o.id = :orderId
          AND o.orderStatus = 'CONFIRMED'
    """)
    int tryTransitionToShipping(@Param("orderId") Long orderId);

}
