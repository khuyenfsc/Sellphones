package com.sellphones.service.customer.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.customer.CustomerInfoRequest;
import com.sellphones.dto.customer.admin.AdminCustomerInfoFilterRequest;
import com.sellphones.dto.customer.admin.AdminCustomerInfoResponse;

import java.util.List;

public interface AdminCustomerService {
    PageResponse<AdminCustomerInfoResponse> getCustomerInfos(AdminCustomerInfoFilterRequest request);
    AdminCustomerInfoResponse getCustomerInfoById(Long id);
    void createCustomerInfo(CustomerInfoRequest request);
    void updateCustomerInfo(CustomerInfoRequest request, Long id);
    void deleteCustomerInfo(Long id);
}
