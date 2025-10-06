package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.product.admin.*;
import com.sellphones.service.product.admin.AdminProductFilterService;
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
@RequestMapping("/api/v1/admin/product-filters")
public class AdminProductFilterController {

    private final AdminProductFilterService adminProductFilterService;

    @GetMapping
    public ResponseEntity<CommonResponse> getProductFilters(AdminProductFilterFilterRequest request){
        List<AdminProductFilterResponse> products = adminProductFilterService.getProductFilters(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", products);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/add-product-filter")
    public ResponseEntity<CommonResponse> addProductFilter(@RequestBody @Valid AdminProductFilterRequest request) {
        adminProductFilterService.addProductFilter(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added product filter successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/edit-product-filter/{id}")
    public ResponseEntity<CommonResponse> editProductFilter(@RequestBody @Valid AdminProductFilterRequest request, @PathVariable Long id) {
        adminProductFilterService.editProductFilter(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited product filter successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-product-filter/{id}")
    public ResponseEntity<CommonResponse> deleteProductFilter(@PathVariable Long id) {
        adminProductFilterService.deleteProductFilter(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted product filter successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @GetMapping("/{filterId}/filter-options")
    public ResponseEntity<CommonResponse> getAttributeValues(@Valid AdminFilterOptionFilterRequest request, @PathVariable Long attributeId){
        List<AdminFilterOptionListResponse> responses = adminProductFilterService.getFilterOptions(request, attributeId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", responses);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }


    @GetMapping("/filter-options/{optionId}")
    public ResponseEntity<CommonResponse> getFilterOptionDetails(@PathVariable Long optionId){
        AdminFilterOptionResponse responses = adminProductFilterService.getFilterOptionDetails(optionId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", responses);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }


}
