package com.sellphones.controller.order;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.product.OrderVariant_ProductVariantRequest;
import com.sellphones.repository.order.OrderVariantRepository;
import com.sellphones.service.order.OrderVariantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/order-variants")
@RequiredArgsConstructor
public class OrderVariantController {

    private final OrderVariantService orderVariantService;

    @GetMapping("/{variantId}/purchased")
    public ResponseEntity<CommonResponse> hasPurchasedVariant(@PathVariable Long variantId) {
        boolean purchased = orderVariantService.hasPurchasedVariant(variantId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", purchased);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }
}
