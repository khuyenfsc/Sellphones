package com.sellphones.controller.customer;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.customer.AdminCustomerInfoFilterRequest;
import com.sellphones.dto.customer.AdminCustomerInfoResponse;
import com.sellphones.service.customer.admin.AdminCustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/customer-infos")
public class AdminCustomerController {

    private final AdminCustomerService adminCustomerService;

    @GetMapping
    public ResponseEntity<CommonResponse> getCustomerInfos(AdminCustomerInfoFilterRequest request){
        List<AdminCustomerInfoResponse> response = adminCustomerService.getCustomerInfos(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-customer-info/{id}")
    public ResponseEntity<CommonResponse> deleteCustomerInfos(@PathVariable Long id){
        adminCustomerService.deleteCustomerInfo(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted customer info successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
