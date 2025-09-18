package com.sellphones.controller.order;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.OrderDetailResponse;
import com.sellphones.dto.order.OrderListResponse;
import com.sellphones.dto.order.OrderRequest;
import com.sellphones.entity.order.OrderStatus;
import com.sellphones.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/order")
    public ResponseEntity<CommonResponse> order(@RequestBody OrderRequest orderRequest){
        orderService.order(orderRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Order successfully");
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @GetMapping
    public ResponseEntity<CommonResponse> getOrders(
        @RequestParam(required = false) LocalDate startDate,
        @RequestParam(required = false) LocalDate endDate,
        @RequestParam Integer page,
        @RequestParam Integer size,
        @RequestParam(required = false) OrderStatus orderStatus
    ){
        PageResponse<OrderListResponse> orderListResponses = orderService.getOrders(startDate, endDate, page, size, orderStatus);
        Map<String, Object> map = new HashMap<>();
        map.put("orders", orderListResponses);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponse> getOrderDetailById(@PathVariable Long id){
        OrderDetailResponse orderDetailResponse = orderService.getOrderDetailsById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("order", orderDetailResponse);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }
}
