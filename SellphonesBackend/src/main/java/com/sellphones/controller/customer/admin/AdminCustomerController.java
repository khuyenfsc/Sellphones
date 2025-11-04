package com.sellphones.controller.customer.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.customer.CustomerInfoRequest;
import com.sellphones.dto.customer.admin.AdminCustomerInfoFilterRequest;
import com.sellphones.dto.customer.admin.AdminCustomerInfoResponse;
import com.sellphones.service.customer.admin.AdminCustomerService;
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
@RequestMapping("/api/v1/admin/customers")
public class AdminCustomerController {

    private final AdminCustomerService adminCustomerService;

    @GetMapping
    public ResponseEntity<CommonResponse> getCustomerInfos(AdminCustomerInfoFilterRequest request){
        PageResponse<AdminCustomerInfoResponse> response = adminCustomerService.getCustomerInfos(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PostMapping("/create-customer-info")
    public ResponseEntity<CommonResponse> createCustomerInfo(@RequestBody @Valid CustomerInfoRequest request){
        adminCustomerService.createCustomerInfo(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created customer successfully!");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @DeleteMapping("/delete-customer-info/{id}")
    public ResponseEntity<CommonResponse> deleteCustomerInfos(@PathVariable Long id){
        adminCustomerService.deleteCustomerInfo(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted customer info successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

}
