package com.sellphones.service.address.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.address.admin.AdminAddressFilterRequest;
import com.sellphones.dto.address.admin.AdminAddressRequest;
import com.sellphones.dto.address.AddressResponse;

public interface AdminAddressService {
    PageResponse<AddressResponse> getAddresses(AdminAddressFilterRequest request);
    void addAddress(AdminAddressRequest request);
    void editAddress(AdminAddressRequest request, Long id);
    void deleteAddress(Long id);
}
