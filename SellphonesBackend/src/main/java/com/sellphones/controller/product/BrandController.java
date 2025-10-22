package com.sellphones.controller.product;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.product.BrandResponse;
import com.sellphones.service.product.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/brands")
public class BrandController {

    private final BrandService brandService;

//    @GetMapping("/category/{categoryId}")
//    public ResponseEntity<CommonResponse> getBrandsByCategoryId(@PathVariable Long categoryId){
//        List<BrandResponse> response = brandService.getBrandByCategoryId(categoryId);
//        Map<String, Object> map = new HashMap<>();
//        map.put("result", response);
//
//        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
//    }

    @GetMapping("/category/{categoryName}")
    public ResponseEntity<CommonResponse> getBrandsByCategoryName(@PathVariable String categoryName){
        List<BrandResponse> response = brandService.getBrandByCategoryName(categoryName);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
