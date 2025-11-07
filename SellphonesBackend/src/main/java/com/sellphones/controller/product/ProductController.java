package com.sellphones.controller.product;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.*;
import com.sellphones.service.product.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

//    @GetMapping("/all")
//    public ResponseEntity<List<ProductListResponse>> getAllProducts(){
//        List<ProductListResponse> products = productService.getAllProducts();
//        if(products == null){
//            products = Collections.emptyList();
//        }
//
//        return ResponseEntity.status(HttpStatus.OK).body(products);
//    }

    @GetMapping("/featured-products/{categoryName}")
    public ResponseEntity<CommonResponse> getFeaturedProductsByCategoryName(
            @PathVariable String categoryName
    ){
        List<ProductListResponse> products = productService.getFeaturedProductsByCategory(categoryName);
        Map<String, Object> map = new HashMap<>();
        map.put("result", products);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/query")
    public ResponseEntity<CommonResponse> queryProducts(@RequestBody @Valid FilterRequest filter){
        PageResponse<ProductListResponse> products = productService.getProductByFilter(filter);
        Map<String, Object> map = new HashMap<>();
        map.put("products", products);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponse> getProductById(@PathVariable Long id){
        ProductDetailsResponse product = productService.getProductById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", product);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/product-variants/{id}")
    public ResponseEntity<CommonResponse> getProductVariantById(@PathVariable Long id){
        ProductVariantResponse product = productService.getProductVariantById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", product);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

//    @GetMapping("/{id}/similar-products")
//    public ResponseEntity<CommonResponse> getSimilarProducts(@PathVariable Long id){
//        List<ProductListResponse> product = productService.getSimilarProducts(id);
//        Map<String, Object> map = new HashMap<>();
//        map.put("result", product);
//        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
//
//    }

//    @GetMapping("/quick_search")
//    public ResponseEntity<CommonResponse> getSuggestedProducts(
//            @RequestParam String keyword
//    ){
//        System.out.println("Keyword is " + keyword);
//        List<ProductDocumentResponse> products = productService.getSuggestedProducts(keyword);
//        Map<String, Object> map = new HashMap<>();
//        map.put("result", products);
//        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
//
//    }

//    @GetMapping("/advanced-search")
//    public ResponseEntity<CommonResponse> searchProductsByKeyword(
//            @RequestParam String keyword,
//            @RequestParam Integer page,
//            @RequestParam Integer size,
//            @RequestParam(required = false, name = "sort_type") String sortType
//    ){
//        PageResponse<ProductListResponse> products = productService.searchProductsByKeyword(keyword, page, size, sortType);
//        Map<String, Object> map = new HashMap<>();
//        map.put("products", products);
//        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
//
//    }


}
