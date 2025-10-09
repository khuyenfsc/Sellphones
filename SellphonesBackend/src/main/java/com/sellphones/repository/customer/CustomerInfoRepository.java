package com.sellphones.repository.customer;

import com.sellphones.entity.customer.CustomerInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CustomerInfoRepository extends JpaRepository<CustomerInfo, Long>, JpaSpecificationExecutor<CustomerInfo> {
}
