package com.sellphones.repository.installment;

import com.sellphones.entity.installment.InstallmentOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstallmentOrderRepository extends JpaRepository<InstallmentOrder, Long> {
}
