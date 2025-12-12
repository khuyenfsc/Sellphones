package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminProductDetailsResponse;
import com.sellphones.dto.product.admin.AdminProduct_FilterRequest;
import com.sellphones.dto.product.admin.AdminProductVariant_FilterRequest;
import com.sellphones.dto.product.admin.AdminProductVariantResponse;
import com.sellphones.dto.product.ProductResponse;
import com.sellphones.dto.product.ProductVariantResponse;
//import com.sellphones.elasticsearch.AdminProductDocumentService;
import com.sellphones.service.product.admin.AdminProductService;
import jakarta.validation.Valid;
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

    private final AdminProductService adminProductService;

    @GetMapping
    public ResponseEntity<CommonResponse> getProducts(@Valid AdminProduct_FilterRequest request){
        PageResponse<ProductResponse> products = adminProductService.getProducts(request);
        Map<String, Object> map = new HashMap<>();
        map.put("products", products);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/create")
    public ResponseEntity<CommonResponse> createProduct(
            @RequestPart("product") String productJson,
            @RequestPart(name = "image_files", required = false) MultipartFile[] imageFiles,
            @RequestPart(name = "thumbnail_file") MultipartFile thumbnailFile
    ){

        adminProductService.createProduct(productJson, imageFiles, thumbnailFile);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created product successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CommonResponse> updateProduct(
            @RequestPart("product") String productJson,
            @RequestPart(name = "image_files", required = false) MultipartFile[] imageFiles,
            @RequestPart(name = "thumbnail_file", required = false) MultipartFile thumbnailFile,
            @PathVariable Long id
    ){
        adminProductService.updateProduct(productJson, imageFiles, thumbnailFile, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated product successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CommonResponse> deleteProduct(
            @PathVariable Long id
    ){
        adminProductService.deleteProduct(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted product successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponse> getProductById(@PathVariable Long id){
        AdminProductDetailsResponse response = adminProductService.getProductById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/{productId}/variants")
    public ResponseEntity<CommonResponse> getProductVariants(@Valid AdminProductVariant_FilterRequest request, @PathVariable Long productId){
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
    public ResponseEntity<CommonResponse> getVariantById(@PathVariable Long id){
        ProductVariantResponse response = adminProductService.getVariantById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/{productId}/variants/create")
    public ResponseEntity<CommonResponse> createVariant(
            @RequestPart("variant") String productVariantJson,
            @RequestPart(name = "image_file", required = false) MultipartFile imageFile,
            @PathVariable Long productId
    ){
        adminProductService.createVariant(productVariantJson, imageFile, productId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created product variant successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/variants/update/{id}")
    public ResponseEntity<CommonResponse> updateVariant(
            @RequestPart("variant") String productVariantJson,
            @RequestPart(name = "image_file", required = false) MultipartFile imageFile,
            @PathVariable Long id
    ){
        adminProductService.updateVariant(productVariantJson, imageFile, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated product variant successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/variants/delete/{id}")
    public ResponseEntity<CommonResponse> deleteProductVariant(
            @PathVariable Long id
    ){
        adminProductService.deleteVariant(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted product variant successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }
    

}
