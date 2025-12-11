package com.sellphones.controller.inventory.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.*;
import com.sellphones.service.inventory.AdminStockEntryService;
import com.sellphones.service.inventory.AdminSupplierService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/suppliers")
public class AdminSupplierController {

    private final AdminSupplierService adminSupplierService;

    private final AdminStockEntryService adminStockEntryService;

    @GetMapping
    public ResponseEntity<CommonResponse> getSuppliers(@Valid AdminSupplier_FilterRequest request){
        PageResponse<AdminSupplierResponse> response = adminSupplierService.getSuppliers(request);
        Map<String, Object> map = new HashMap<>();
        map.put("suppliers", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponse> getSupplierById(@PathVariable Long id){
        AdminSupplierResponse response = adminSupplierService.getSupplierById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PostMapping("/create")
    public ResponseEntity<CommonResponse> createSupplier(@RequestBody @Valid AdminSupplierRequest request) {
        adminSupplierService.createSupplier(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created supplier successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CommonResponse> editSupplier(@RequestBody @Valid AdminSupplierRequest request, @PathVariable Long id) {
        adminSupplierService.updateSupplier(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated supplier successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CommonResponse> deleteSupplier(@PathVariable Long id) {
        adminSupplierService.deleteSupplier(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted supplier successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @GetMapping("/{supplierId}/stock-entries")
    public ResponseEntity<CommonResponse> getStockEntries(
        @Valid AdminStockEntry_FilterRequest request,
        @PathVariable Long supplierId
    ){
        PageResponse<AdminStockEntryResponse> response = adminStockEntryService.getStockEntriesBySupplierId(request, supplierId);
        Map<String, Object> map = new HashMap<>();
        map.put("stock_entries", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PostMapping("/{supplierId}/stock-entries/create")
    public ResponseEntity<CommonResponse> createStockEntry(
        @RequestBody @Valid AdminCreateStockEntryRequest request,
        @PathVariable Long supplierId
    ) {
        adminStockEntryService.createStockEntry(request, supplierId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added stock entry successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PutMapping("/stock-entries/update/{id}")
    public ResponseEntity<CommonResponse> updateStockEntry(@RequestBody @Valid AdminUpdateStockEntryRequest request, @PathVariable Long id) {
        adminStockEntryService.updateStockEntry(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated stock entry successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @DeleteMapping("/stock-entries/delete/{id}")
    public ResponseEntity<CommonResponse> deleteStockEntry(@PathVariable Long id) {
        adminStockEntryService.deleteStockEntry(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted stock entry successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }
}
