package com.sellphones.service.order;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.OrderDetailResponse;
import com.sellphones.dto.order.OrderListResponse;
import com.sellphones.dto.order.OrderRequest;
import com.sellphones.entity.order.OrderStatus;
import org.aspectj.weaver.ast.Or;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {

    void order(OrderRequest orderRequest);

    PageResponse<OrderListResponse> getOrders(LocalDate startDate, LocalDate endDate, Integer page, Integer size, OrderStatus orderStatus);

    OrderDetailResponse getOrderDetailsById(Long id);
}
