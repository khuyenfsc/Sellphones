package com.sellphones.controller.inventory;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.*;
import com.sellphones.service.inventory.AdminInventoryService;
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
@RequestMapping("/api/v1/admin/inventories")
public class AdminInventoryController {

    private final AdminInventoryService adminInventoryService;

    @GetMapping
    public ResponseEntity<CommonResponse> getInventories(AdminInventoryFilterRequest request){
        PageResponse<AdminInventoryResponse> response = adminInventoryService.getInventories(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }
//
//    @PostMapping("/add-inventory")
//    public ResponseEntity<CommonResponse> addInventory(@RequestBody @Valid AdminInventoryRequest request) {
//        adminInventoryService.addInventory(request);
//        Map<String, Object> map = new HashMap<>();
//        map.put("result", "Added inventory successfully");
//
//        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
//    }
//
//    @PutMapping("/edit-inventory/{id}")
//    public ResponseEntity<CommonResponse> editInventory(@RequestBody @Valid AdminInventoryRequest request, @PathVariable Long id) {
//        adminInventoryService.editInventory(request, id);
//        Map<String, Object> map = new HashMap<>();
//        map.put("result", "Edited inventory successfully");
//
//        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
//    }
//
//    @DeleteMapping("/delete-inventory/{id}")
//    public ResponseEntity<CommonResponse> deleteStockEntry(@PathVariable Long id) {
//        adminInventoryService.deleteInventory(id);
//        Map<String, Object> map = new HashMap<>();
//        map.put("result", "Deleted inventory successfully");
//
//        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
//    }

}
