package com.sellphones.repository.customer;

import com.sellphones.entity.customer.CustomerInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface CustomerInfoRepository extends JpaRepository<CustomerInfo, Long>, JpaSpecificationExecutor<CustomerInfo> {
    Optional<CustomerInfo> findByUser_EmailAndId(String email, Long id);
    List<CustomerInfo> findByUser_Email(String email);
    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

}
