package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.*;
import com.sellphones.service.product.admin.AdminCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/categories")
@RequiredArgsConstructor
public class AdminCategoryController {

    private final AdminCategoryService adminCategoryService;

    @GetMapping
    public ResponseEntity<CommonResponse> getCategories(AdminCategoryFilterRequest request){
        PageResponse<AdminCategoryResponse> response = adminCategoryService.getCategories(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/create-category")
    public ResponseEntity<CommonResponse> addCategory(
        @RequestPart("category") String categoryJson,
        @RequestPart(name = "file", required = false) MultipartFile iconFile
    ){
        adminCategoryService.addCategory(categoryJson, iconFile);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added category value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/update-category/{id}")
    public ResponseEntity<CommonResponse> editCategory(
        @RequestPart("category") String categoryJson,
        @RequestPart(name = "file", required = false) MultipartFile iconFile,
        @PathVariable Long id
    ){
        adminCategoryService.editCategory(categoryJson, iconFile, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited category successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete-category/{categoryId}")
    public ResponseEntity<CommonResponse> deleteCategory(@PathVariable Long categoryId){
        adminCategoryService.deleteCategory( categoryId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted category successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/{categoryId}/options")
    public ResponseEntity<CommonResponse> getCategoriesOptions(@Valid AdminCategoryOptionFilterRequest request, @PathVariable Long categoryId){
        PageResponse<AdminCategoryOptionResponse> response = adminCategoryService.getCategoryOptions(request, categoryId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/{categoryId}/create-option")
    public ResponseEntity<CommonResponse> addCategoryOption(@RequestBody @Valid AdminCategoryOptionRequest request, @PathVariable Long categoryId){
        adminCategoryService.addCategoryOption(request, categoryId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added category option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/update-option/{categoryOptionId}")
    public ResponseEntity<CommonResponse> editCategoryOption(@RequestBody @Valid AdminCategoryOptionRequest request, @PathVariable Long categoryOptionId){
        adminCategoryService.editCategoryOption(request, categoryOptionId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited category option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete-option/{categoryOptionId}")
    public ResponseEntity<CommonResponse> deleteCategoryOption(@PathVariable Long categoryOptionId){
        adminCategoryService.deleteCategoryOption(categoryOptionId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted category option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/options/{categoryOptionId}/values")
    public ResponseEntity<CommonResponse> getCategoriesOptionValues(@Valid AdminCategoryOptionValueFilterRequest request, @PathVariable Long categoryOptionId){
        PageResponse<AdminCategoryOptionValueResponse> response = adminCategoryService.getCategoryOptionValues(request, categoryOptionId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/options/{categoryOptionId}/create-value")
    public ResponseEntity<CommonResponse> addCategoryOptionValue(@RequestBody @Valid AdminCategoryOptionValueRequest request, @PathVariable Long categoryOptionId){
        adminCategoryService.addCategoryOptionValue(request, categoryOptionId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added category option value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/options/update-value/{categoryOptionId}")
    public ResponseEntity<CommonResponse> editCategoryOptionValue(@RequestBody @Valid AdminCategoryOptionValueRequest request, @PathVariable Long categoryOptionId){
        adminCategoryService.editCategoryOptionValue(request, categoryOptionId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited category option value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/options/delete-value/{categoryOptionValueId}")
    public ResponseEntity<CommonResponse> deleteCategoryOptionValue(@PathVariable Long categoryOptionValueId){
        adminCategoryService.deleteCategoryOptionValue(categoryOptionValueId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted category option value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

}
