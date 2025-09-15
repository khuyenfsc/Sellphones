package com.sellphones.service.cart;

import com.sellphones.dto.cart.CartItemRequest;
import com.sellphones.dto.cart.CartResponse;
import com.sellphones.dto.cart.ItemQuantityRequest;

public interface CartService {

    CartResponse getCart();
    
    void addItemsToCart(CartItemRequest cartItemRequest);

    void updateItemQuantity(ItemQuantityRequest itemQuantityRequest);
}
