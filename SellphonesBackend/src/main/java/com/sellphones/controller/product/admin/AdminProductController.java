package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.product.admin.AdminProductFilterRequest;
import com.sellphones.dto.product.response.ProductListResponse;
import com.sellphones.elasticsearch.AdminProductDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/products")
@RequiredArgsConstructor
public class AdminProductController {

    private final AdminProductDocumentService adminProductDocumentService;

    @GetMapping
    public ResponseEntity<CommonResponse> getProducts(AdminProductFilterRequest request){
        List<ProductListResponse> products = adminProductDocumentService.getProducts(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", products);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
