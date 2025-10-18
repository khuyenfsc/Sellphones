package com.sellphones.service.order.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.admin.AdminShipmentDetailsResponse;
import com.sellphones.dto.order.admin.AdminShipmentFilterRequest;
import com.sellphones.dto.order.admin.AdminShipmentListResponse;

import java.util.List;

public interface AdminShipmentService {
    PageResponse<AdminShipmentListResponse> getShipments(AdminShipmentFilterRequest request);
    AdminShipmentDetailsResponse getShipmentDetails(Long id);
}
