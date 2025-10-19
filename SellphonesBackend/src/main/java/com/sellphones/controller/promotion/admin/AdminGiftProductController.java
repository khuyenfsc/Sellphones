package com.sellphones.controller.promotion.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.promotion.admin.AdminGiftProductFilterRequest;
import com.sellphones.dto.promotion.admin.AdminGiftProductResponse;
import com.sellphones.service.promotion.admin.AdminGiftProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/gift-products")
public class AdminGiftProductController {

    private final AdminGiftProductService adminGiftProductService;

    @GetMapping
    public ResponseEntity<CommonResponse> getGiftProducts(AdminGiftProductFilterRequest request){
        PageResponse<AdminGiftProductResponse> response = adminGiftProductService.getGiftProducts(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/create-gift-product")
    public ResponseEntity<CommonResponse> addProduct(
            @RequestPart("gift_product") String giftProductJson,
            @RequestPart(name = "file", required = false) MultipartFile thumbnailFile
    ){

        adminGiftProductService.createGiftProduct(giftProductJson, thumbnailFile);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created product successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PutMapping("/edit-gift-product/{id}")
    public ResponseEntity<CommonResponse> editProduct(
            @RequestPart("gift_product") String giftProductJson,
            @RequestPart(name = "file", required = false) MultipartFile thumbnailFile,
            @PathVariable Long id
    ){
        adminGiftProductService.editGiftProduct(giftProductJson, thumbnailFile, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited product successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-gift-product/{id}")
    public ResponseEntity<CommonResponse> deleteProduct(@PathVariable Long id){
        adminGiftProductService.deleteGiftProduct(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted gift product successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }
}
