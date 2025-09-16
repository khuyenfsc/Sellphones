package com.sellphones.controller.order;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.order.OrderRequest;
import com.sellphones.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/order")
    public ResponseEntity<CommonResponse> order(@RequestBody OrderRequest orderRequest){

    }

}
