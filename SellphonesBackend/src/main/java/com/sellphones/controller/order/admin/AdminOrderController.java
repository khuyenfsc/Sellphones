package com.sellphones.controller.order.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.OrderResponse;
import com.sellphones.dto.order.OrderRequest;
import com.sellphones.dto.order.admin.AdminOrderFilterRequest;
import com.sellphones.dto.order.admin.AdminShipmentRequest;
import com.sellphones.service.order.OrderService;
import com.sellphones.service.order.admin.AdminOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {

    private final AdminOrderService adminOrderService;

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<CommonResponse> getOrders(AdminOrderFilterRequest request){
        PageResponse<OrderResponse> response = adminOrderService.getOrders(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/make-order")
    public ResponseEntity<CommonResponse> makeOrder(@RequestBody @Valid OrderRequest request){
        orderService.order(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Make order successfully!");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PutMapping("/confirm/{id}")
    public ResponseEntity<CommonResponse> confirmOrder(@PathVariable Long id){
        adminOrderService.confirmOrder(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Confirmed order successfully!");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PutMapping("/ship-order/{id}")
    public ResponseEntity<CommonResponse> shipOrder(@RequestBody AdminShipmentRequest request, @PathVariable Long id){
        adminOrderService.shipOrder(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Shipped order successfully!");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PutMapping("/deliver-order/{id}")
    public ResponseEntity<CommonResponse> deliverOrder(@PathVariable Long id){
        adminOrderService.deliverOrder(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Delivered order successfully!");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PutMapping("/cancel-order/{id}")
    public ResponseEntity<CommonResponse> cancelOrder(@PathVariable Long id){
        adminOrderService.cancelOrder(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Cancelled order successfully!");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
