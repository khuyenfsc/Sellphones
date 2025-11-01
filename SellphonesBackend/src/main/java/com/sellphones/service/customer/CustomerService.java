package com.sellphones.service.customer;

import com.sellphones.dto.customer.CustomerInfoRequest;
import com.sellphones.dto.customer.CustomerInfoResponse;

import java.util.List;

public interface CustomerService {
    CustomerInfoResponse createCustomerInfo(CustomerInfoRequest request);
    List<CustomerInfoResponse> getCustomerInfos();
    CustomerInfoResponse updateCustomerInfo(CustomerInfoRequest request, Long id);
    void deleteCustomerInfo(Long id);
}
