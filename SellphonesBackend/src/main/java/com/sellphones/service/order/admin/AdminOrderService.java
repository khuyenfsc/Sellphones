package com.sellphones.service.order.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.dashboard.DashboardRequest;
import com.sellphones.dto.order.OrderResponse;
import com.sellphones.dto.order.admin.AdminOrderFilterRequest;
import com.sellphones.dto.order.admin.AdminOrderListResponse;
import com.sellphones.dto.order.admin.AdminShipmentRequest;

import java.util.Map;

public interface AdminOrderService {
    PageResponse<AdminOrderListResponse> getOrders(AdminOrderFilterRequest request);
    void confirmOrder(Long id);
    void shipOrder(AdminShipmentRequest request, Long id);
    void deliverOrder(Long id);
    void cancelOrder(Long id);
}
