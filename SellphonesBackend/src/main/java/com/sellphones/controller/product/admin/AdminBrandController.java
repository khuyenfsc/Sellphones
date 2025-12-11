package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.*;
import com.sellphones.service.product.admin.AdminBrandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/brands")
@RequiredArgsConstructor
public class AdminBrandController {

    private final AdminBrandService adminBrandService;

    @GetMapping
    public ResponseEntity<CommonResponse> getBrands(@Valid AdminBrand_FilterRequest request){
        PageResponse<AdminBrandResponse> response = adminBrandService.getBrands(request);
        Map<String, Object> map = new HashMap<>();
        map.put("brands", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/create-brand")
    public ResponseEntity<CommonResponse> addBrand(
            @RequestPart("brand")String brandJson,
            @RequestPart(name = "icon_file", required = false) MultipartFile iconFile
    ){
        adminBrandService.createBrand(brandJson, iconFile);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created brand successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CommonResponse> editBrand(
            @RequestPart("brand")String brandJson,
            @PathVariable Long id,
            @RequestPart(name = "icon_file", required = false) MultipartFile iconFile
    ){
        adminBrandService.updateBrand(brandJson, iconFile, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated brand successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CommonResponse> deleteBrand(
            @PathVariable Long id
    ){
        adminBrandService.deleteBrand(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted brand successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

}
