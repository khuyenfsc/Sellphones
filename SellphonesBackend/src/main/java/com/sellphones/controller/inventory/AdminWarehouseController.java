package com.sellphones.controller.inventory;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.*;
import com.sellphones.service.inventory.AdminWarehouseService;
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
@RequestMapping("/api/v1/admin/warehouses")
public class AdminWarehouseController {

    private final AdminWarehouseService adminWarehouseService;

    @GetMapping
    public ResponseEntity<CommonResponse> getWarehouses(AdminWarehouseFilterRequest request){
        PageResponse<AdminWarehouseResponse> response = adminWarehouseService.getWarehouses(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PostMapping("/add-warehouse")
    public ResponseEntity<CommonResponse> addWarehouse(@RequestBody @Valid AdminWarehouseRequest request) {
        adminWarehouseService.addWarehouse(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added warehouse successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PutMapping("/edit-warehouse/{id}")
    public ResponseEntity<CommonResponse> editWarehouse(@RequestBody @Valid AdminWarehouseRequest request, @PathVariable Long id) {
        adminWarehouseService.editWarehouse(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited warehouse successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @DeleteMapping("/delete-warehouse/{id}")
    public ResponseEntity<CommonResponse> deleteWarehouse(@PathVariable Long id) {
        adminWarehouseService.deleteWarehouse(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted warehouse successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

}
