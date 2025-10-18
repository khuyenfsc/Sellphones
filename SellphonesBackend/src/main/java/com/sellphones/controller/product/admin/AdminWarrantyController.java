package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.*;
import com.sellphones.service.product.admin.AdminWarrantyService;
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
@RequestMapping("/api/v1/admin/warranties")
public class AdminWarrantyController {

    private final AdminWarrantyService adminWarrantyService;

    @GetMapping
    public ResponseEntity<CommonResponse> getWarranties(AdminWarrantyFilterRequest request){
        PageResponse<AdminWarrantyResponse> response = adminWarrantyService.getWarranties(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/add-warranty")
    public ResponseEntity<CommonResponse> addWarranty(@RequestBody @Valid AdminWarrantyRequest request) {
        adminWarrantyService.addWarranty(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added warranty successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PutMapping("/edit-warranty/{id}")
    public ResponseEntity<CommonResponse> editWarranty(@RequestBody @Valid AdminWarrantyRequest request, @PathVariable Long id) {
        adminWarrantyService.editWarranty(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited warranty successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-warranty/{id}")
    public ResponseEntity<CommonResponse> deleteWarranty(@PathVariable Long id) {
        adminWarrantyService.deleteWarranty(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted warranty successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }
}
