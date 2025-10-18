package com.sellphones.service.order.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.OrderResponse;
import com.sellphones.dto.order.admin.AdminOrderFilterRequest;
import com.sellphones.dto.order.admin.AdminShipmentRequest;

public interface AdminOrderService {
    PageResponse<OrderResponse> getOrders(AdminOrderFilterRequest request);
    void confirmOrder(Long id);
    void shipOrder(AdminShipmentRequest request, Long id);
    void deliverOrder(Long id);
    void cancelOrder(Long id);
}
