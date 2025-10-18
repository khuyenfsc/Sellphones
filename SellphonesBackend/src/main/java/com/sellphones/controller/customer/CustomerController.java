package com.sellphones.controller.customer;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.customer.CustomerInfoRequest;
import com.sellphones.service.customer.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping("/create-customer-info")
    public ResponseEntity<CommonResponse> createCustomerInfo(@RequestBody @Valid CustomerInfoRequest request){
        customerService.createCustomerInfo(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created customer successfully!");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }
}
