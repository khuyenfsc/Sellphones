package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.product.admin.AdminProductFilterRequest;
import com.sellphones.dto.product.response.ProductListResponse;
import com.sellphones.elasticsearch.AdminProductDocumentService;
import com.sellphones.service.product.admin.AdminProductService;
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
@RequestMapping("/api/v1/admin/products")
@RequiredArgsConstructor
public class AdminProductController {

    private final AdminProductDocumentService adminProductDocumentService;

    private final AdminProductService adminProductService;

    @GetMapping
    public ResponseEntity<CommonResponse> getProducts(AdminProductFilterRequest request){
        List<ProductListResponse> products = adminProductDocumentService.getProducts(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", products);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/add-product")
    public ResponseEntity<CommonResponse> addProduct(
            @RequestPart("product") String productJson,
            @RequestPart(name = "files", required = false) MultipartFile[] imageFiles,
            @RequestPart(name = "file", required = false) MultipartFile thumbnailFile
    ){
        adminProductService.addProducts(productJson, imageFiles, thumbnailFile);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added product successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/edit-product/{productId}")
    public ResponseEntity<CommonResponse> editProduct(
            @RequestPart("product") String productJson,
            @RequestPart(name = "files", required = false) MultipartFile[] imageFiles,
            @RequestPart(name = "file", required = false) MultipartFile thumbnailFile,
            @PathVariable Long productId
    ){
        adminProductService.editProduct(productJson, imageFiles, thumbnailFile, productId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited product successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-product/{productId}")
    public ResponseEntity<CommonResponse> deleteProduct(
            @PathVariable Long productId
    ){
        adminProductService.deleteProduct(productId);
        adminProductDocumentService.deleteProduct(productId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted product successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @GetMapping("/{productId}/product-variants")
    public ResponseEntity<CommonResponse> getProductVariants(AdminProductFilterRequest request, @PathVariable Long productId){
        List<ProductListResponse> products = adminProductDocumentService.getProducts(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", products);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
