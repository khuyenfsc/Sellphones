package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
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
        PageResponse<AdminProductFilterResponse> products = adminProductFilterService.getProductFilters(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", products);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/add-product-filter")
    public ResponseEntity<CommonResponse> addProductFilter(@RequestBody @Valid AdminProductFilterRequest request) {
        adminProductFilterService.addProductFilter(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added product filter successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/edit-product-filter/{id}")
    public ResponseEntity<CommonResponse> editProductFilter(@RequestBody @Valid AdminProductFilterRequest request, @PathVariable Long id) {
        adminProductFilterService.editProductFilter(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited product filter successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete-product-filter/{id}")
    public ResponseEntity<CommonResponse> deleteProductFilter(@PathVariable Long id) {
        adminProductFilterService.deleteProductFilter(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted product filter successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/{filterId}/filter-options")
    public ResponseEntity<CommonResponse> getFilterOptions(@Valid AdminFilterOptionFilterRequest request, @PathVariable Long filterId){
        PageResponse<AdminFilterOptionResponse> response = adminProductFilterService.getFilterOptions(request, filterId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }


//    @GetMapping("/filter-options/{optionId}")
//    public ResponseEntity<CommonResponse> getFilterOptionDetails(@PathVariable Long optionId){
//        AdminFilterOptionResponse responses = adminProductFilterService.getFilterOptionDetails(optionId);
//        Map<String, Object> map = new HashMap<>();
//        map.put("result", responses);
//
//        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

//    }

    @PostMapping("/{filterId}/add-filter-option")
    public ResponseEntity<CommonResponse> addFilterOption(@RequestBody @Valid AdminFilterOptionRequest request, @PathVariable Long filterId) {
        adminProductFilterService.addFilterOption(request, filterId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added filter option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/edit-filter-option/{optionId}")
    public ResponseEntity<CommonResponse> editFilterOption(@RequestBody @Valid AdminFilterOptionRequest request, @PathVariable Long optionId) {
        adminProductFilterService.editFilterOption(request, optionId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited filter option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete-filter-option/{optionId}")
    public ResponseEntity<CommonResponse> deleteFilterOption(@PathVariable Long optionId) {
        adminProductFilterService.deleteFilterOption(optionId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted filter option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }
}
