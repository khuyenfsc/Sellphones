package com.sellphones.controller.order;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.OrderDetailResponse;
import com.sellphones.dto.order.OrderFilterRequest;
import com.sellphones.dto.order.OrderResponse;
import com.sellphones.dto.order.OrderRequest;
import com.sellphones.service.order.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/total")
    public ResponseEntity<CommonResponse> getTotalOrders(){
        Map<String, Object> total = orderService.getTotalOrders();
        Map<String, Object> map = new HashMap<>();
        map.put("result", total);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PostMapping()
    public ResponseEntity<CommonResponse> order(@RequestBody OrderRequest orderRequest){
        OrderResponse response = orderService.order(orderRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @GetMapping
    public ResponseEntity<CommonResponse> getOrders(@Valid OrderFilterRequest request){
        PageResponse<OrderResponse> response = orderService.getOrders(request);
        Map<String, Object> map = new HashMap<>();
        map.put("orders", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponse> getOrderDetailById(@PathVariable Long id){
        OrderDetailResponse orderDetailResponse = orderService.getOrderDetailsById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", orderDetailResponse);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PostMapping("/cancel/{id}")
    public ResponseEntity<CommonResponse> cancelOrder(@PathVariable Long id){
        orderService.cancelOrder(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Canceled order successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }
}
