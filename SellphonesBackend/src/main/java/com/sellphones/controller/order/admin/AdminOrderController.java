package com.sellphones.controller.order.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.OrderDetailResponse;
import com.sellphones.dto.order.admin.AdminOrder_FilterRequest;
import com.sellphones.dto.order.admin.AdminOrderResponse;
import com.sellphones.dto.order.admin.AdminOrderRequest;
import com.sellphones.dto.order.admin.AdminShipmentRequest;
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

    @GetMapping
    public ResponseEntity<CommonResponse> getOrders(@Valid AdminOrder_FilterRequest request){
        PageResponse<AdminOrderResponse> response = adminOrderService.getOrders(request);
        Map<String, Object> map = new HashMap<>();
        map.put("orders", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponse> getOrderById(@PathVariable Long id){
        OrderDetailResponse response = adminOrderService.getOrderById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PostMapping("/create")
    public ResponseEntity<CommonResponse> createOrder(@RequestBody @Valid AdminOrderRequest request){
        adminOrderService.createOrder(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created order successfully!");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PutMapping("/confirm/{id}")
    public ResponseEntity<CommonResponse> confirmOrder(@PathVariable Long id){
        adminOrderService.confirmOrder(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Confirmed order successfully!");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PutMapping("/ship-order/{id}")
    public ResponseEntity<CommonResponse> shipOrder(@RequestBody AdminShipmentRequest request, @PathVariable Long id){
        adminOrderService.shipOrder(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Shipped order successfully!");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PutMapping("/deliver/{id}")
    public ResponseEntity<CommonResponse> deliverOrder(@PathVariable Long id){
        adminOrderService.deliverOrder(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Delivered order successfully!");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity<CommonResponse> cancelOrder(@PathVariable Long id){
        adminOrderService.cancelOrder(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Cancelled order successfully!");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

}
