package com.sellphones.controller.inventory;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.AdminSupplierFilterRequest;
import com.sellphones.dto.inventory.admin.AdminSupplierRequest;
import com.sellphones.dto.inventory.admin.AdminSupplierResponse;
import com.sellphones.service.inventory.AdminSupplierService;
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
@RequestMapping("/api/v1/admin/suppliers")
public class AdminSupplierController {

    private final AdminSupplierService adminSupplierService;

    @GetMapping
    public ResponseEntity<CommonResponse> getSuppliers(AdminSupplierFilterRequest request){
        PageResponse<AdminSupplierResponse> response = adminSupplierService.getSuppliers(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/add-supplier")
    public ResponseEntity<CommonResponse> addSupplier(@RequestBody @Valid AdminSupplierRequest request) {
        adminSupplierService.addSupplier(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added supplier successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PutMapping("/edit-supplier/{id}")
    public ResponseEntity<CommonResponse> editSupplier(@RequestBody @Valid AdminSupplierRequest request, @PathVariable Long id) {
        adminSupplierService.editSupplier(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited supplier successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-supplier/{id}")
    public ResponseEntity<CommonResponse> deleteSupplier(@PathVariable Long id) {
        adminSupplierService.deleteSupplier(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted supplier successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }
}
