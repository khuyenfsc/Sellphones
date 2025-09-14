package com.sellphones.controller.cart;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.cart.CartResponse;
import com.sellphones.service.cart.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/items")
    public ResponseEntity<CommonResponse> getCartItems(){
        CartResponse cartResponse = cartService.getCart();
        Map<String, Object> map = new HashMap<>();
        map.put("cart", cartResponse);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
