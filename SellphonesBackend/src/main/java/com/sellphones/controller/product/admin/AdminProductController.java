package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminProductDetailResponse;
import com.sellphones.dto.product.admin.AdminProduct_FilterRequest;
import com.sellphones.dto.product.admin.AdminProductVariantFilterRequest;
import com.sellphones.dto.product.admin.AdminProductVariantResponse;
import com.sellphones.dto.product.ProductListResponse;
import com.sellphones.dto.product.ProductVariantResponse;
//import com.sellphones.elasticsearch.AdminProductDocumentService;
import com.sellphones.service.product.admin.AdminProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/products")
@RequiredArgsConstructor
public class AdminProductController {

//    private final AdminProductDocumentService adminProductDocumentService;

    private final AdminProductService adminProductService;

    @GetMapping
    public ResponseEntity<CommonResponse> getProducts(AdminProduct_FilterRequest request){
        PageResponse<ProductListResponse> products = adminProductService.getProducts(request);
        Map<String, Object> map = new HashMap<>();
        map.put("products", products);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/create-product")
    public ResponseEntity<CommonResponse> addProduct(
            @RequestPart("product") String productJson,
            @RequestPart(name = "files", required = false) MultipartFile[] imageFiles,
            @RequestPart(name = "file") MultipartFile thumbnailFile
    ){

        adminProductService.addProduct(productJson, imageFiles, thumbnailFile);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added product successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/update-product/{productId}")
    public ResponseEntity<CommonResponse> editProduct(
            @RequestPart("product") String productJson,
            @RequestPart(name = "files", required = false) MultipartFile[] imageFiles,
            @RequestPart(name = "file", required = false) MultipartFile thumbnailFile,
            @PathVariable Long productId
    ){
        adminProductService.editProduct(productJson, imageFiles, thumbnailFile, productId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited product successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete-product/{productId}")
    public ResponseEntity<CommonResponse> deleteProduct(
            @PathVariable Long productId
    ){
        adminProductService.deleteProduct(productId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted product successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/{productId}")
    public ResponseEntity<CommonResponse> getProductDetails(@PathVariable Long productId){
        AdminProductDetailResponse response = adminProductService.getProductDetails(productId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/{productId}/variants")
    public ResponseEntity<CommonResponse> getProductVariants(AdminProductVariantFilterRequest request, @PathVariable Long productId){
        PageResponse<AdminProductVariantResponse> products = adminProductService.getProductVariants(request, productId);
        Map<String, Object> map = new HashMap<>();
        map.put("variants", products);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/{productId}/variants/{id}/set-thumbnail")
    public ResponseEntity<CommonResponse> setThumbnail(@PathVariable Long productId, @PathVariable Long id){
        adminProductService.setThumbnail(productId, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Set thumbnail product successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/variants/{id}")
    public ResponseEntity<CommonResponse> getProductVariantDetails(@PathVariable Long id){
        ProductVariantResponse response = adminProductService.getProductVariantDetail(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/{productId}/create-variant")
    public ResponseEntity<CommonResponse> addProductVariant(
            @RequestPart("product_variant") String productVariantJson,
            @RequestPart(name = "file", required = false) MultipartFile file,
            @PathVariable Long productId
    ){
        adminProductService.addProductVariant(productVariantJson, file, productId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added product variant successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/update-variant/{id}")
    public ResponseEntity<CommonResponse> editProductVariant(
            @RequestPart("product_variant") String productVariantJson,
            @RequestPart(name = "file", required = false) MultipartFile file,
            @PathVariable Long id
    ){
        adminProductService.editProductVariant(productVariantJson, file, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited product variant successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete-variant/{id}")
    public ResponseEntity<CommonResponse> deleteProductVariant(
            @PathVariable Long id
    ){
        adminProductService.deleteProductVariant(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted product variant successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }
    

}
