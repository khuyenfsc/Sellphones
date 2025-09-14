package com.sellphones.entity.revenue;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.order.Order;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "monthly_revenue")
public class MonthlyRevenue extends BaseEntity<Long> {

    @Column(nullable = false)
    private int year;

    @Column(nullable = false)
    private int month;

    @Column(name = "total_revenue", nullable = false)
    private Long totalRevenue;

    @Column(name = "total_profit", nullable = false)
    private Long totalProfit;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "order_count", nullable = false)
    private Long orderCount;
}
