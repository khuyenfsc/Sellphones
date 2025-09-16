package com.sellphones.service.cart;

import com.sellphones.dto.cart.CartItemRequest;
import com.sellphones.dto.cart.CartResponse;
import com.sellphones.dto.cart.DeletedItemRequest;
import com.sellphones.dto.cart.ItemQuantityRequest;
import com.sellphones.entity.cart.Cart;
import com.sellphones.entity.cart.CartItem;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.cart.CartItemRepository;
import com.sellphones.repository.cart.CartRepository;
import com.sellphones.repository.product.ProductVariantRepository;
import com.sellphones.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;

    private final ModelMapper modelMapper;

    private final ProductVariantRepository productVariantRepository;

    private final CartItemRepository cartItemRepository;

    private final static Long DEFAULT_QUANTITY = 1L;

    @Override
    public CartResponse getCart() {
        Cart cart = getCurrentUserCart();
        return modelMapper.map(cart, CartResponse.class);
    }

    @Override
    @Transactional
    public void addItemsToCart(CartItemRequest cartItemRequest) {
        ProductVariant productVariant = productVariantRepository.findById(cartItemRequest.getProductVariantId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));
        if(productVariant.getStock() == 0){
            throw new AppException(ErrorCode.PRODUCT_VARIANT_OUT_OF_STOCK);
        }

        CartItem existingItem = cartItemRepository.findByProductVariantAndCart_User_Email(productVariant, SecurityUtils.extractNameFromAuthentication())
                .orElse(null);
        if(existingItem != null){
            throw new AppException(ErrorCode.CART_ITEM_ALREADY_EXISTS);
        }

        Cart cart = getCurrentUserCart();
        cartItemRepository.save(new CartItem(cart, productVariant, DEFAULT_QUANTITY, LocalDateTime.now()));
    }

    @Override
    @Transactional
    public void updateItemQuantity(ItemQuantityRequest itemQuantityRequest) {
        CartItem cartItem = cartItemRepository.findByIdAndCart_User_Email(itemQuantityRequest.getCartItemId(), SecurityUtils.extractNameFromAuthentication())
                        .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));
        cartItem.setQuantity(itemQuantityRequest.getQuantity());
    }

    @Override
    public void deleteCartItem(DeletedItemRequest deletedItemRequest) {
        CartItem cartItem = cartItemRepository.findByIdAndCart_User_Email(deletedItemRequest.getCartItemId(), SecurityUtils.extractNameFromAuthentication())
                .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));
        cartItemRepository.delete(cartItem);
    }

    private Cart getCurrentUserCart(){
        return cartRepository.findByUser_Email(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));
    }


}
