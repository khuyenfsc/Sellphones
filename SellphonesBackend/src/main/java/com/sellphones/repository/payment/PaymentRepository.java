package com.sellphones.repository.payment;

import com.sellphones.entity.order.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByTxnRef(String txnRef);

    @Query("""
        SELECT SUM(p.amount)
        FROM Payment p
        WHERE p.paymentDate BETWEEN :start AND :end
          AND p.status = 'COMPLETED'
    """)
    BigDecimal calculateTotalSales(@Param("start") LocalDateTime start,
                                   @Param("end") LocalDateTime end);
}
