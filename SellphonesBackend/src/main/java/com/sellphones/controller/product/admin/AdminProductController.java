package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.product.admin.AdminProductDetailResponse;
import com.sellphones.dto.product.admin.AdminProductFilter_Request;
import com.sellphones.dto.product.admin.AdminProductVariantFilterRequest;
import com.sellphones.dto.product.admin.AdminProductVariantListResponse;
import com.sellphones.dto.product.response.ProductListResponse;
import com.sellphones.dto.product.response.ProductVariantResponse;
import com.sellphones.elasticsearch.AdminProductDocumentService;
import com.sellphones.service.product.admin.AdminProductService;
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
    public ResponseEntity<CommonResponse> getProducts(AdminProductFilter_Request request){
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

        adminProductService.addProduct(productJson, imageFiles, thumbnailFile);
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

    @GetMapping("/{productId}")
    public ResponseEntity<CommonResponse> getProductDetails(@PathVariable Long productId){
        AdminProductDetailResponse response = adminProductService.getProductDetails(productId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @GetMapping("/{productId}/product-variants")
    public ResponseEntity<CommonResponse> getProductVariants(AdminProductVariantFilterRequest request, @PathVariable Long productId){
        List<AdminProductVariantListResponse> products = adminProductService.getProductVariants(request, productId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", products);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @GetMapping("/product-variants/{productVariantId}")
    public ResponseEntity<CommonResponse> getProductVariantDetails(@PathVariable Long productVariantId){
        ProductVariantResponse response = adminProductService.getProductVariantDetail(productVariantId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/{productId}/add-product-variant")
    public ResponseEntity<CommonResponse> addProductVariant(
            @RequestPart("product_variant") String productVariantJson,
            @RequestPart(name = "file", required = false) MultipartFile file,
            @PathVariable Long productId
    ){
        adminProductService.addProductVariant(productVariantJson, file, productId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added product variant successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/edit-product-variant/{productVariantId}")
    public ResponseEntity<CommonResponse> editProductVariant(
            @RequestPart("product_variant") String productVariantJson,
            @RequestPart(name = "file", required = false) MultipartFile file,
            @PathVariable Long productVariantId
    ){
        adminProductService.editProductVariant(productVariantJson, file, productVariantId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited product variant successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-product-variant/{productVariantId}")
    public ResponseEntity<CommonResponse> deleteProductVariant(
            @PathVariable Long productVariantId
    ){
        adminProductService.deleteProductVariant(productVariantId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted product variant successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
