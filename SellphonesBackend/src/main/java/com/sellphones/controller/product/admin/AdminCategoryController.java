package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.*;
import com.sellphones.service.product.admin.AdminCategoryService;
import com.sellphones.service.product.admin.AdminProductFilterService;
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

    private final AdminProductFilterService adminProductFilterService;

    @GetMapping
    public ResponseEntity<CommonResponse> getCategories(AdminCategoryFilterRequest request){
        PageResponse<AdminCategoryResponse> response = adminCategoryService.getCategories(request);
        Map<String, Object> map = new HashMap<>();
        map.put("categories", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<CommonResponse> getCategoryById(@PathVariable Long categoryId){
        AdminCategoryResponse response = adminCategoryService.getCategoryById( categoryId);
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

    @GetMapping("/{categoryId}/filters")
    public ResponseEntity<CommonResponse> getCategoryById(
            @Valid AdminProductFilter_FilterRequest request,
            @PathVariable Long categoryId
    ){

        PageResponse<AdminProductFilterResponse> response = adminProductFilterService.getFiltersByCategoryId(request, categoryId);
        Map<String, Object> map = new HashMap<>();
        map.put("filters", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/filters/{id}")
    public ResponseEntity<CommonResponse> getFilterById(@PathVariable Long id){

        AdminProductFilterResponse response = adminProductFilterService.getFilterById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/{categoryId}/filters/create-filter")
    public ResponseEntity<CommonResponse> addProductFilter(
            @RequestBody @Valid AdminProductFilterRequest request,
            @PathVariable Long categoryId
    ) {
        adminProductFilterService.addProductFilter(request, categoryId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added product filter successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/filters/update-filter/{id}")
    public ResponseEntity<CommonResponse> updateProductFilter(
            @RequestBody @Valid AdminProductFilterRequest request,
            @PathVariable Long id
    ) {
        adminProductFilterService.editProductFilter(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited product filter successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/filters/delete-filter/{id}")
    public ResponseEntity<CommonResponse> deleteProductFilter(@PathVariable Long id) {
        adminProductFilterService.deleteProductFilter(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted product filter successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/filters/{filterId}/options")
    public ResponseEntity<CommonResponse> getFilterOptions(@Valid AdminFilterOptionFilterRequest request, @PathVariable Long filterId){
        PageResponse<AdminFilterOptionResponse> response = adminProductFilterService.getFilterOptions(request, filterId);
        Map<String, Object> map = new HashMap<>();
        map.put("options", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/filters/{filterId}/create-option")
    public ResponseEntity<CommonResponse> createFilterOption(
            @RequestBody @Valid AdminFilterOptionRequest request,
            @PathVariable Long filterId
    ) {
        adminProductFilterService.addFilterOption(request, filterId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added filter option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/filters/options/update-option/{optionId}")
    public ResponseEntity<CommonResponse> updateFilterOption(
            @RequestBody @Valid AdminFilterOptionRequest request,
            @PathVariable Long optionId
    ) {
        adminProductFilterService.editFilterOption(request, optionId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited filter option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/filters/options/delete-option/{optionId}")
    public ResponseEntity<CommonResponse> deleteFilterOption(@PathVariable Long optionId) {
        adminProductFilterService.deleteFilterOption(optionId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted filter option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/{categoryId}/options")
    public ResponseEntity<CommonResponse> getCategoriesOptions(@Valid AdminCategoryOptionFilterRequest request, @PathVariable Long categoryId){
        PageResponse<AdminCategoryOptionResponse> response = adminCategoryService.getCategoryOptions(request, categoryId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @GetMapping("/options/{id}")
    public ResponseEntity<CommonResponse> getCategoryOptionById(@PathVariable Long id){
        AdminCategoryOptionResponse response = adminCategoryService.getCategoryOptionById(id);
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
