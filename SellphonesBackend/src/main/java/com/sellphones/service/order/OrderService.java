package com.sellphones.service.order;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.OrderDetailResponse;
import com.sellphones.dto.order.OrderFilterRequest;
import com.sellphones.dto.order.OrderResponse;
import com.sellphones.dto.order.OrderRequest;

import java.util.Map;

public interface OrderService {

    Map<String, Object> getTotalOrders();

    OrderResponse order(OrderRequest orderRequest);

    PageResponse<OrderResponse> getOrders(OrderFilterRequest request);

    OrderDetailResponse getOrderDetailsById(Long id);

    void cancelOrder(Long id);
}
