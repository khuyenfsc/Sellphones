package com.sellphones.service.order.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.ShipmentResponse;
import com.sellphones.dto.order.admin.AdminShipmentDetailsResponse;
import com.sellphones.dto.order.admin.AdminShipmentFilterRequest;
import com.sellphones.dto.order.admin.AdminUpdateShipmentRequest;

public interface AdminShipmentService {
    PageResponse<ShipmentResponse> getShipments(AdminShipmentFilterRequest request);
    AdminShipmentDetailsResponse getShipmentDetails(Long id);
    void updateShipment(AdminUpdateShipmentRequest request, Long id);
}
