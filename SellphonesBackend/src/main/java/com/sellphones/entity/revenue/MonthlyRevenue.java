package com.sellphones.entity.revenue;

import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.order.Order;
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

    private int year;

    private int month;

    private Long totalRevenue;

    private Long totalProfit;

    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "monthlyRevenue")
    private List<Order> orders;
}
