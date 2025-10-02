package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.product.admin.*;
import com.sellphones.service.product.admin.AdminBrandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/brands")
@RequiredArgsConstructor
public class AdminBrandController {

    private final AdminBrandService adminBrandService;

    @GetMapping
    public ResponseEntity<CommonResponse> getBrands(@Valid AdminBrandFilterRequest request){
        List<AdminBrandResponse> responses = adminBrandService.getBrands(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", responses);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/add-brand")
    public ResponseEntity<CommonResponse> addBrand(
            @RequestPart("brand")String brandJson,
            @RequestPart(name = "file", required = false) MultipartFile file
    ){
        adminBrandService.addBrand(brandJson, file);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added brand successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/edit-brand/{id}")
    public ResponseEntity<CommonResponse> editBrand(
            @RequestPart("brand")String brandJson,
            @PathVariable Long id,
            @RequestPart(name = "file", required = false) MultipartFile file
    ){
        adminBrandService.editBrand(brandJson, file, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited brand successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/delete-brand/{id}")
    public ResponseEntity<CommonResponse> deleteBrand(
            @PathVariable Long id
    ){
        adminBrandService.deleteBrand(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted brand successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
