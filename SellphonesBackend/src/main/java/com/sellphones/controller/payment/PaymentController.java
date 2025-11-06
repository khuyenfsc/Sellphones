package com.sellphones.controller.payment;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.payment.PaymentRequest;
import com.sellphones.service.payment.PaymentService;
import com.sellphones.service.payment.VnPayService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final VnPayService vnPayService;

    @PostMapping("/vnpay")
    public ResponseEntity<CommonResponse> payByVNPay(@RequestBody @Valid PaymentRequest request, HttpServletRequest servletRequest){
        Map<String, String> response = vnPayService.pay(request, servletRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }
    @GetMapping("/vnpay-callback")
    public ResponseEntity<CommonResponse> testVNPayCallback(HttpServletRequest request){
        System.out.println(request.getQueryString());
        Map<String, Object> map = new HashMap<>();
        map.put("result", "test");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }
}
