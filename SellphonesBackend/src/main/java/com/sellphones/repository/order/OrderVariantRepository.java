package com.sellphones.repository.order;

import com.sellphones.entity.order.OrderVariant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderVariantRepository extends JpaRepository<OrderVariant, Long> {
}
