package com.sellphones.dto.cart;

import com.sellphones.dto.product.CartItemVariantResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponse {

    private Long id;

    private CartItemVariantResponse productVariant;

    private Long quantity;

}
