package com.sellphones.controller.promotion.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.promotion.admin.*;
import com.sellphones.service.promotion.admin.AdminProductPromotionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/product-promotions")
public class AdminProductPromotionController {

    private final AdminProductPromotionService adminProductPromotionService;

    @GetMapping
    public ResponseEntity<CommonResponse> getGiftProducts(AdminProductPromotionFilterRequest request){
        PageResponse<AdminProductPromotionResponse> response = adminProductPromotionService.getProductPromotions(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/create-product-promotion")
    public ResponseEntity<CommonResponse> createProductPromotion(@RequestBody @Valid AdminProductPromotionRequest request){
        adminProductPromotionService.createProductPromotion(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created product promotion successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PutMapping("/edit-product-promotion/{id}")
    public ResponseEntity<CommonResponse> editProduct(
            @RequestBody @Valid AdminProductPromotionRequest request,
            @PathVariable Long id
    ){
        adminProductPromotionService.editProductPromotion(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited product promotion successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-product-promotion/{id}")
    public ResponseEntity<CommonResponse> deleteProductPromotion(@PathVariable Long id){
        adminProductPromotionService.deleteProductPromotion(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted product promotion successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
