package com.sellphones.dto.cart;

import com.sellphones.dto.product.CartItem_VariantResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponse {

    private Long id;

    private CartItem_VariantResponse productVariant;

    private Long quantity;

}
