package com.sellphones.service.order.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.OrderListResponse;
import com.sellphones.dto.order.admin.AdminOrderFilterRequest;

import java.util.List;

public interface AdminOrderService {
    PageResponse<OrderListResponse> getOrders(AdminOrderFilterRequest request);
}
