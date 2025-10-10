package com.sellphones.service.customer.admin;

import com.sellphones.dto.customer.AdminCustomerInfoFilterRequest;
import com.sellphones.dto.customer.AdminCustomerInfoResponse;

import java.util.List;

public interface AdminCustomerService {
    List<AdminCustomerInfoResponse> getCustomerInfos(AdminCustomerInfoFilterRequest request);
    void deleteCustomerInfo(Long id);
}
