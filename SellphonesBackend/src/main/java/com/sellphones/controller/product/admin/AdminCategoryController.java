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

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/add-category")
    public ResponseEntity<CommonResponse> addCategory(
        @RequestPart("category") String categoryJson,
        @RequestPart(name = "file", required = false) MultipartFile iconFile
    ){
        adminCategoryService.addCategory(categoryJson, iconFile);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added category value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PutMapping("/edit-category/{id}")
    public ResponseEntity<CommonResponse> editCategory(
        @RequestPart("category") String categoryJson,
        @RequestPart(name = "file", required = false) MultipartFile iconFile,
        @PathVariable Long id
    ){
        adminCategoryService.editCategory(categoryJson, iconFile, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited category successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-category/{categoryId}")
    public ResponseEntity<CommonResponse> deleteCategory(@PathVariable Long categoryId){
        adminCategoryService.deleteCategory( categoryId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted category successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @GetMapping("/{categoryId}/category-options")
    public ResponseEntity<CommonResponse> getCategoriesOptions(AdminCategoryOptionFilterRequest request, @PathVariable Long categoryId){
        PageResponse<AdminCategoryOptionResponse> response = adminCategoryService.getCategoryOptions(request, categoryId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/{categoryId}/add-category-option")
    public ResponseEntity<CommonResponse> addCategoryOption(@RequestBody @Valid AdminCategoryOptionRequest request, @PathVariable Long categoryId){
        adminCategoryService.addCategoryOption(request, categoryId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added category option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PutMapping("/edit-category-option/{categoryOptionId}")
    public ResponseEntity<CommonResponse> editCategoryOption(@RequestBody @Valid AdminCategoryOptionRequest request, @PathVariable Long categoryOptionId){
        adminCategoryService.editCategoryOption(request, categoryOptionId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited category option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-category-option/{categoryOptionId}")
    public ResponseEntity<CommonResponse> deleteCategoryOption(@PathVariable Long categoryOptionId){
        adminCategoryService.deleteCategoryOption(categoryOptionId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted category option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @GetMapping("/category-option/{categoryOptionId}/category-option-values")
    public ResponseEntity<CommonResponse> getCategoriesOptionValues(AdminCategoryOptionValueFilterRequest request, @PathVariable Long categoryOptionId){
        PageResponse<AdminCategoryOptionValueResponse> response = adminCategoryService.getCategoryOptionValues(request, categoryOptionId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/category-option/{categoryOptionId}/add-category-option-value")
    public ResponseEntity<CommonResponse> addCategoryOptionValue(@RequestBody @Valid AdminCategoryOptionValueRequest request, @PathVariable Long categoryOptionId){
        adminCategoryService.addCategoryOptionValue(request, categoryOptionId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added category option value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PutMapping("/edit-category-option-value/{categoryOptionId}")
    public ResponseEntity<CommonResponse> editCategoryOptionValue(@RequestBody @Valid AdminCategoryOptionValueRequest request, @PathVariable Long categoryOptionId){
        adminCategoryService.editCategoryOptionValue(request, categoryOptionId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited category option value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-category-option-value/{categoryOptionValueId}")
    public ResponseEntity<CommonResponse> deleteCategoryOptionValue(@PathVariable Long categoryOptionValueId){
        adminCategoryService.deleteCategoryOptionValue(categoryOptionValueId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted category option value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
