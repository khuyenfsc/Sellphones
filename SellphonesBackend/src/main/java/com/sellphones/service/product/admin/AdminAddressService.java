package com.sellphones.service.product.admin;

import com.sellphones.dto.address.AdminAddressFilterRequest;
import com.sellphones.dto.address.AdminAddressRequest;
import com.sellphones.dto.address.AdminAddressResponse;

import java.util.List;

public interface AdminAddressService {
    List<AdminAddressResponse> getAddresses(AdminAddressFilterRequest request);
    void addAddress(AdminAddressRequest request);
    void editAddress(AdminAddressRequest request, Long id);
    void deleteAddress(Long id);
}
