package com.sellphones.service.address.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.address.admin.AdminAddressFilterRequest;
import com.sellphones.dto.address.AddressRequest;
import com.sellphones.dto.address.AddressResponse;

public interface AdminAddressService {
    PageResponse<AddressResponse> getAddresses(AdminAddressFilterRequest request);
    void addAddress(AddressRequest request);
    void editAddress(AddressRequest request, Long id);
    void deleteAddress(Long id);
}
