//package com.sellphones.controller.product;
//
//import com.sellphones.dto.CommonResponse;
//import com.sellphones.dto.product.ProductFilterResponse;
//import com.sellphones.service.product.ProductFilterService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/api/v1/filters")
//public class ProductFilterController {
//
//    private final ProductFilterService productFilterService;
//
//    @GetMapping("/{categoryName}/filters")
//    public ResponseEntity<CommonResponse> getFiltersByCategory(
//            @PathVariable("categoryName") String categoryName
//    ){
//        List<ProductFilterResponse> filterOptions = productFilterService.getProductFiltersByCategoryName(categoryName);
//        Map<String, Object> map = new HashMap<>();
//        map.put("result", filterOptions);
//        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
//
//    }
//}
