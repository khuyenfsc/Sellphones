package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.*;
import com.sellphones.service.product.admin.AdminCategoryService;
import com.sellphones.service.product.admin.AdminProductFilterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/categories")
@RequiredArgsConstructor
public class AdminCategoryController {

    private final AdminCategoryService adminCategoryService;

    private final AdminProductFilterService adminProductFilterService;

    @GetMapping
    public ResponseEntity<CommonResponse> getCategories(@Valid AdminCategory_FilterRequest request){
        PageResponse<AdminCategoryResponse> response = adminCategoryService.getCategories(request);
        Map<String, Object> map = new HashMap<>();
        map.put("categories", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponse> getCategoryById(@PathVariable Long id){
        AdminCategoryResponse response = adminCategoryService.getCategoryById( id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/create")
    public ResponseEntity<CommonResponse> addCategory(
        @RequestPart("category") String categoryJson,
        @RequestPart(name = "icon_file", required = false) MultipartFile iconFile
    ){
        adminCategoryService.createCategory(categoryJson, iconFile);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created category value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CommonResponse> editCategory(
        @RequestPart("category") String categoryJson,
        @RequestPart(name = "icon_file", required = false) MultipartFile iconFile,
        @PathVariable Long id
    ){
        adminCategoryService.updateCategory(categoryJson, iconFile, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated category successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CommonResponse> deleteCategory(@PathVariable Long id){
        adminCategoryService.deleteCategory(id);
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

    @PostMapping("/{categoryId}/filters/create")
    public ResponseEntity<CommonResponse> createFilter(
            @RequestBody @Valid AdminProductFilterRequest request,
            @PathVariable Long categoryId
    ) {
        adminProductFilterService.createFilter(request, categoryId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created product filter successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/filters/update/{id}")
    public ResponseEntity<CommonResponse> updateProductFilter(
            @RequestBody @Valid AdminProductFilterRequest request,
            @PathVariable Long id
    ) {
        adminProductFilterService.updateFilter(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated product filter successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/filters/delete/{id}")
    public ResponseEntity<CommonResponse> deleteFilter(@PathVariable Long id) {
        adminProductFilterService.deleteFilter(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted product filter successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/filters/{filterId}/options")
    public ResponseEntity<CommonResponse> getFilterOptions(@Valid AdminFilterOption_FilterRequest request, @PathVariable Long filterId){
        PageResponse<AdminFilterOptionDetailsResponse> response = adminProductFilterService.getFilterOptions(request, filterId);
        Map<String, Object> map = new HashMap<>();
        map.put("options", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/filters/{filterId}/create")
    public ResponseEntity<CommonResponse> createOption(
            @RequestBody @Valid AdminFilterOptionRequest request,
            @PathVariable Long filterId
    ) {
        adminProductFilterService.createOption(request, filterId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created filter option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/filters/options/update/{id}")
    public ResponseEntity<CommonResponse> updateOption(
            @RequestBody @Valid AdminFilterOptionRequest request,
            @PathVariable Long id
    ) {
        adminProductFilterService.updateOption(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited filter option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/filters/options/delete/{id}")
    public ResponseEntity<CommonResponse> deleteFilterOption(@PathVariable Long id) {
        adminProductFilterService.deleteOption(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted filter option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/{categoryId}/options")
    public ResponseEntity<CommonResponse> getCategoriesOptions(@Valid AdminCategoryOption_FilterRequest request, @PathVariable Long categoryId){
        PageResponse<AdminCategoryOptionResponse> response = adminCategoryService.getOptionsByCategoryId(request, categoryId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @GetMapping("/options/{id}")
    public ResponseEntity<CommonResponse> getOptionById(@PathVariable Long id){
        AdminCategoryOptionResponse response = adminCategoryService.getOptionById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @PostMapping("/{categoryId}/options/create")
    public ResponseEntity<CommonResponse> createOption(@RequestBody @Valid AdminCategoryOptionRequest request, @PathVariable Long categoryId){
        adminCategoryService.createOption(request, categoryId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created category option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/options/update/{id}")
    public ResponseEntity<CommonResponse> updateOption(@RequestBody @Valid AdminCategoryOptionRequest request, @PathVariable Long id){
        adminCategoryService.updateOption(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated category option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/options/delete/{id}")
    public ResponseEntity<CommonResponse> deleteOption(@PathVariable Long id){
        adminCategoryService.deleteOption(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted category option successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/options/{optionId}/values")
    public ResponseEntity<CommonResponse> getValuesByOptionId(@Valid AdminCategoryOptionValue_FilterRequest request, @PathVariable Long optionId){
        PageResponse<AdminCategoryOptionValueResponse> response = adminCategoryService.getValuesByOptionId(request, optionId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/options/{optionId}/values/create-value")
    public ResponseEntity<CommonResponse> createValue(@RequestBody @Valid AdminCategoryOptionValueRequest request, @PathVariable Long optionId){
        adminCategoryService.createValue(request, optionId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created category option value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/options/values/update/{id}")
    public ResponseEntity<CommonResponse> updateValue(@RequestBody @Valid AdminCategoryOptionValueRequest request, @PathVariable Long id){
        adminCategoryService.updateValue(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated category option value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/options/values/delete/{id}")
    public ResponseEntity<CommonResponse> deleteValue(@PathVariable Long id){
        adminCategoryService.deleteValue(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted category option value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

}
