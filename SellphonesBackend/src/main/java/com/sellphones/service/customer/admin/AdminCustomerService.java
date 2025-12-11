package com.sellphones.service.customer.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.customer.CustomerInfoRequest;
import com.sellphones.dto.customer.admin.AdminCustomerInfo_FilterRequest;
import com.sellphones.dto.customer.admin.AdminCustomerInfoResponse;

public interface AdminCustomerService {
    PageResponse<AdminCustomerInfoResponse> getCustomerInfos(AdminCustomerInfo_FilterRequest request);
    AdminCustomerInfoResponse getCustomerInfoById(Long id);
    void createCustomerInfo(CustomerInfoRequest request);
    void updateCustomerInfo(CustomerInfoRequest request, Long id);
    void deleteCustomerInfo(Long id);
}
