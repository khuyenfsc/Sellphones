package com.sellphones.service.order.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.OrderDetailResponse;
import com.sellphones.dto.order.admin.AdminOrder_FilterRequest;
import com.sellphones.dto.order.admin.AdminOrderResponse;
import com.sellphones.dto.order.admin.AdminOrderRequest;
import com.sellphones.dto.order.admin.AdminShipmentRequest;

public interface AdminOrderService {
    PageResponse<AdminOrderResponse> getOrders(AdminOrder_FilterRequest request);
    OrderDetailResponse getOrderById(Long id);
    void createOrder(AdminOrderRequest request);
    void confirmOrder(Long id);
    void shipOrder(AdminShipmentRequest request, Long id);
    void deliverOrder(Long id);
    void cancelOrder(Long id);
}
