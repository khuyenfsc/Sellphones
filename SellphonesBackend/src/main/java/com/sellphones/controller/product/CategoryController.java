package com.sellphones.controller.product;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.product.response.CategoryResponse;
import com.sellphones.dto.product.response.ProductFilterResponse;
import com.sellphones.service.product.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/all")
    public ResponseEntity<CommonResponse> getAllCategories(){
        List<CategoryResponse> categories = categoryService.getAllCategories();
        Map<String, Object> map = new HashMap<>();
        map.put("categories", categories);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @GetMapping("/{categoryId}/filters")
    public ResponseEntity<CommonResponse> getFiltersByCategory(
            @PathVariable("categoryId") Long categoryId
    ){
        List<ProductFilterResponse> filterOptions = categoryService.getProductFiltersByCategory(categoryId);
        Map<String, Object> map = new HashMap<>();
        map.put("filter_options", filterOptions);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }
}
