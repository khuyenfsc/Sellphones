package com.sellphones.controller.inventory.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.*;
import com.sellphones.service.inventory.AdminInventoryService;
import com.sellphones.service.inventory.AdminStockEntryService;
import com.sellphones.service.inventory.AdminWarehouseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/warehouses")
public class AdminWarehouseController {

    private final AdminWarehouseService adminWarehouseService;

    private final AdminInventoryService adminInventoryService;

    private final AdminStockEntryService adminStockEntryService;

    @GetMapping
    public ResponseEntity<CommonResponse> getWarehouses(@Valid AdminWarehouse_FilterRequest request){
        PageResponse<AdminWarehouseResponse> response = adminWarehouseService.getWarehouses(request);
        Map<String, Object> map = new HashMap<>();
        map.put("warehouses", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponse> getWarehouseById(@PathVariable Long id){
        AdminWarehouseResponse response = adminWarehouseService.getWarehouseById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PostMapping("/create")
    public ResponseEntity<CommonResponse> addWarehouse(@RequestBody @Valid AdminWarehouseRequest request) {
        adminWarehouseService.createWarehouse(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created warehouse successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CommonResponse> editWarehouse(@RequestBody @Valid AdminWarehouseRequest request, @PathVariable Long id) {
        adminWarehouseService.updateWarehouse(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated warehouse successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CommonResponse> deleteWarehouse(@PathVariable Long id) {
        adminWarehouseService.deleteWarehouse(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted warehouse successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @GetMapping("/{warehouseId}/inventories")
    public ResponseEntity<CommonResponse> getInventoriesByWarehouseId(
            @Valid AdminInventory_FilterRequest request,
            @PathVariable Long warehouseId
    ){
        PageResponse<AdminInventoryResponse> response = adminInventoryService.getInventories(request, warehouseId);
        Map<String, Object> map = new HashMap<>();
        map.put("inventories", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @GetMapping("/inventories/{id}")
    public ResponseEntity<CommonResponse> getInventoryById(
            @PathVariable Long id
    ){
        AdminInventoryResponse response = adminInventoryService.getInventoryById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PostMapping("/{warehouseId}/inventories/create")
    public ResponseEntity<CommonResponse> addInventory(
        @RequestBody @Valid AdminInventoryRequest request,
        @PathVariable Long warehouseId
    ) {
        adminInventoryService.createInventory(request, warehouseId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created inventory successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PutMapping("/inventories/update/{id}")
    public ResponseEntity<CommonResponse> editInventory(@RequestBody @Valid AdminInventoryRequest request, @PathVariable Long id) {
        adminInventoryService.updateInventory(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated inventory successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @DeleteMapping("/inventories/delete/{id}")
    public ResponseEntity<CommonResponse> deleteStockEntry(@PathVariable Long id) {
        adminInventoryService.deleteInventory(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted inventory successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @GetMapping("/inventories/{inventoryId}/stock-entries")
    public ResponseEntity<CommonResponse> getInventories(
            @Valid AdminStockEntry_FilterRequest request,
            @PathVariable Long inventoryId
    ){
        PageResponse<AdminStockEntryResponse> response = adminStockEntryService.getStockEntriesByInventoryId(request, inventoryId);
        Map<String, Object> map = new HashMap<>();
        map.put("stock_entries", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }
}
