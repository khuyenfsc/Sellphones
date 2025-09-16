package com.sellphones.controller.cart;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.cart.CartItemRequest;
import com.sellphones.dto.cart.CartResponse;
import com.sellphones.dto.cart.DeletedItemRequest;
import com.sellphones.dto.cart.ItemQuantityRequest;
import com.sellphones.service.cart.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/add-item")
    public ResponseEntity<CommonResponse> addItemToCart(@RequestBody CartItemRequest cartItemRequest){
        cartService.addItemsToCart(cartItemRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Successfully to add item to cart");
        return ResponseEntity.status(HttpStatus.CREATED).body(new CommonResponse(map));
    }

    @PutMapping("/update-quantity")
    public ResponseEntity<CommonResponse> updateItemQuantity(@RequestBody ItemQuantityRequest itemQuantityRequest){
        cartService.updateItemQuantity(itemQuantityRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated quantity successfully");
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-cart-item")
    public ResponseEntity<CommonResponse> deleteCartItem(@RequestBody DeletedItemRequest deletedItemRequest){
        cartService.deleteCartItem(deletedItemRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted cart item successfully");
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
