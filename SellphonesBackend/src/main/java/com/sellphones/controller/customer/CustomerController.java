package com.sellphones.controller.customer;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.customer.CustomerInfoRequest;
import com.sellphones.dto.customer.CustomerInfoResponse;
import com.sellphones.service.customer.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping()
    public ResponseEntity<CommonResponse> getCustomerInfos(){
        List<CustomerInfoResponse> response = customerService.getCustomerInfos();
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PostMapping("/create-customer-info")
    public ResponseEntity<CommonResponse> createCustomerInfo(@RequestBody @Valid CustomerInfoRequest request){
        CustomerInfoResponse response = customerService.createCustomerInfo(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PutMapping("/update-customer-info/{id}")
    public ResponseEntity<CommonResponse> updateCustomerInfo(@RequestBody @Valid CustomerInfoRequest request,@PathVariable Long id){
        CustomerInfoResponse response = customerService.updateCustomerInfo(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @DeleteMapping("/delete-customer-info/{id}")
    public ResponseEntity<CommonResponse> deleteCustomerInfo(@PathVariable Long id){
        customerService.deleteCustomerInfo(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted customer info successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

}
