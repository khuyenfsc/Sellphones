package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.product.admin.AdminStockEntryFilterRequest;
import com.sellphones.dto.product.admin.AdminStockEntryResponse;
import com.sellphones.dto.product.admin.AdminSupplierFilterRequest;
import com.sellphones.dto.product.admin.AdminSupplierResponse;
import com.sellphones.service.product.admin.AdminStockEntryService;
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
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/stock-entries")
public class AdminStockEntryController {

    private final AdminStockEntryService adminStockEntryService;

    @GetMapping
    public ResponseEntity<CommonResponse> getSuppliers(AdminStockEntryFilterRequest request){
        List<AdminStockEntryResponse> response = adminStockEntryService.getStockEntries(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }
}
