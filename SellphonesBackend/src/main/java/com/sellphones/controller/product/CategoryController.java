package com.sellphones.controller.product;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.product.CategoryResponse;
import com.sellphones.dto.product.FeaturedCategoryResponse;
import com.sellphones.dto.product.ProductFilterResponse;
import com.sellphones.service.product.CategoryService;
import com.sellphones.service.product.ProductFilterService;
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

    private final ProductFilterService productFilterService;

    @GetMapping
    public ResponseEntity<CommonResponse> getAllCategories(){
        List<CategoryResponse> categories = categoryService.getAllCategories();
        Map<String, Object> map = new HashMap<>();
        map.put("result", categories);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/featured-categories")
    public ResponseEntity<CommonResponse> getFeaturedCategories(){
        List<FeaturedCategoryResponse> categories = categoryService.getFeaturedCategories();
        Map<String, Object> map = new HashMap<>();
        map.put("result", categories);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/{categoryName}/filters")
    public ResponseEntity<CommonResponse> getFiltersByCategory(
            @PathVariable("categoryName") String categoryName
    ){
        List<ProductFilterResponse> filterOptions = productFilterService.getProductFiltersByCategoryName(categoryName);
        Map<String, Object> map = new HashMap<>();
        map.put("result", filterOptions);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }
}
