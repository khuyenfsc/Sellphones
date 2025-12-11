package com.sellphones.service.order;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.OrderDetailResponse;
import com.sellphones.dto.order.Order_FilterRequest;
import com.sellphones.dto.order.OrderResponse;
import com.sellphones.dto.order.OrderRequest;

import java.util.Map;

public interface OrderService {
    Map<String, Object> getTotalOrders();

    OrderResponse createOrder(OrderRequest orderRequest);

    PageResponse<OrderResponse> getOrders(Order_FilterRequest request);

    OrderDetailResponse getOrderById(Long id);

    void cancelOrder(Long id);
}
