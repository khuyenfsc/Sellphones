package com.sellphones.service.order;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.OrderDetailResponse;
import com.sellphones.dto.order.OrderFilterRequest;
import com.sellphones.dto.order.OrderResponse;
import com.sellphones.dto.order.OrderRequest;

public interface OrderService {

    void order(OrderRequest orderRequest);

    PageResponse<OrderResponse> getOrders(OrderFilterRequest request);

    OrderDetailResponse getOrderDetailsById(Long id);

    void cancelOrder(Long id);
}
