package com.sellphones.controller.product;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.FilterRequest;
import com.sellphones.dto.product.ProductDetailsResponse;
import com.sellphones.dto.product.ProductListResponse;
import com.sellphones.dto.product.ProductVariantResponse;
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

//    private final ProductDocumentService productDocumentService;

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
        map.put("products", products);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/query")
    public ResponseEntity<CommonResponse> queryProducts(@RequestBody @Valid FilterRequest filter){
        PageResponse<ProductListResponse> products = productService.getProductByFilter(filter);
        Map<String, Object> map = new HashMap<>();
        map.put("products", products);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponse> getProductById(@PathVariable Long id){
        ProductDetailsResponse product = productService.getProductById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("product_details", product);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @GetMapping("/product-variants/{id}")
    public ResponseEntity<CommonResponse> getProductVariantById(@PathVariable Long id){
        ProductVariantResponse product = productService.getProductVariantById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("product_variant", product);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

//    @GetMapping("/quick_search")
//    public ResponseEntity<CommonResponse> getSuggestedProducts(
//            @RequestParam String keyword
//    ){
//        System.out.println("Keyword is " + keyword);
//        List<ProductDocumentResponse> products = productDocumentService.getSuggestedProducts(keyword);
//        Map<String, Object> map = new HashMap<>();
//        map.put("suggested_products", products);
//        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
//    }
//
//    @GetMapping("/advanced_search")
//    public ResponseEntity<CommonResponse> searchProductsByKeyword(
//            @RequestParam String keyword,
//            @RequestParam Integer page,
//            @RequestParam(required = false, name = "sort_type") String sortType
//    ){
//        PageResponse<ProductListResponse> products = productDocumentService.searchProductsByKeyword(keyword, page, sortType);
//        Map<String, Object> map = new HashMap<>();
//        map.put("products", products);
//        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
//    }
//

}
