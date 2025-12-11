package com.sellphones.controller.order.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.ShipmentResponse;
import com.sellphones.dto.order.admin.AdminShipmentDetailsResponse;
import com.sellphones.dto.order.admin.AdminShipment_FilterRequest;
import com.sellphones.dto.order.admin.AdminUpdateShipmentRequest;
import com.sellphones.service.order.admin.AdminShipmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/shipments")
public class AdminShipmentController {

    private final AdminShipmentService adminShipmentService;

    @GetMapping
    public ResponseEntity<CommonResponse> getShipments(@Valid AdminShipment_FilterRequest request){
        PageResponse<ShipmentResponse> response = adminShipmentService.getShipments(request);
        Map<String, Object> map = new HashMap<>();
        map.put("shipments", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponse> getShipmentById(@PathVariable Long id){
        AdminShipmentDetailsResponse response = adminShipmentService.getShipmentById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CommonResponse> updateShipment(@RequestBody AdminUpdateShipmentRequest request, @PathVariable Long id){
        adminShipmentService.updateShipment(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated shipment successfully!");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

}
