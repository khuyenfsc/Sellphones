package com.sellphones.repository.installment;

import com.sellphones.entity.installment.InstallmentProvider;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstallmentProviderRepository extends JpaRepository<InstallmentProvider, Long> {
}
