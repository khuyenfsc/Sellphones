package com.sellphones.controller.order;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.OrderListResponse;
import com.sellphones.dto.order.admin.AdminOrderFilterRequest;
import com.sellphones.service.order.admin.AdminOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {

    private final AdminOrderService adminOrderService;

    @GetMapping
    public ResponseEntity<CommonResponse> getOrders(AdminOrderFilterRequest request){
        PageResponse<OrderListResponse> orderListResponses = adminOrderService.getOrders(request);
        Map<String, Object> map = new HashMap<>();
        map.put("orders", orderListResponses);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
