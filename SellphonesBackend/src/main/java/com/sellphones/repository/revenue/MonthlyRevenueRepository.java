package com.sellphones.repository.revenue;

import com.sellphones.entity.revenue.MonthlyRevenue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonthlyRevenueRepository extends JpaRepository<MonthlyRevenue, Long> {
}
