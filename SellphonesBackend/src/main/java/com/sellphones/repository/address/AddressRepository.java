package com.sellphones.repository.address;

import com.sellphones.entity.address.Address;
import com.sellphones.entity.address.AddressType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long>, JpaSpecificationExecutor<Address> {
    Optional<Address> findByIdAndAddressType(Long id, AddressType addressType);
}
