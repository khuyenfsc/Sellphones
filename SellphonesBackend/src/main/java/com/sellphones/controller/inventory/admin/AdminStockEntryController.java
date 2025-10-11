package com.sellphones.controller.inventory.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.inventory.admin.AdminStockEntryFilterRequest;
import com.sellphones.dto.inventory.admin.AdminStockEntryRequest;
import com.sellphones.dto.inventory.admin.AdminStockEntryResponse;
import com.sellphones.service.inventory.AdminStockEntryService;
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
@RequestMapping("/api/v1/admin/stock-entries")
public class AdminStockEntryController {

    private final AdminStockEntryService adminStockEntryService;

    @GetMapping
    public ResponseEntity<CommonResponse> getStockEntries(AdminStockEntryFilterRequest request){
        List<AdminStockEntryResponse> response = adminStockEntryService.getStockEntries(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/add-stock-entry")
    public ResponseEntity<CommonResponse> addStockEntry(@RequestBody @Valid AdminStockEntryRequest request) {
        adminStockEntryService.addStockEntry(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added stock entry successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PutMapping("/edit-stock-entry/{id}")
    public ResponseEntity<CommonResponse> editStockEntry(@RequestBody @Valid AdminStockEntryRequest request, @PathVariable Long id) {
        adminStockEntryService.editStockEntry(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited stock entry successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-stock-entry/{id}")
    public ResponseEntity<CommonResponse> deleteStockEntry(@PathVariable Long id) {
        adminStockEntryService.deleteStockEntry(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted stock entry successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }
}
