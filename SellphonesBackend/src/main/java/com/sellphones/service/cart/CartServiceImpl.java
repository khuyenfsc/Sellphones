package com.sellphones.service.cart;

import com.sellphones.dto.cart.CartItemRequest;
import com.sellphones.dto.cart.CartResponse;
import com.sellphones.dto.cart.ItemQuantityRequest;
import com.sellphones.entity.cart.Cart;
import com.sellphones.entity.cart.CartItem;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.promotion.GiftProduct;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.cart.CartItemRepository;
import com.sellphones.repository.cart.CartRepository;
import com.sellphones.repository.product.ProductVariantRepository;
import com.sellphones.utils.ImageNameToImageUrlConverter;
import com.sellphones.utils.ProductUtils;
import com.sellphones.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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

    private final ProductUtils productUtils;

    private final String variantImageFolderName = "product_variant_images";

    private final String giftProductFolderName = "gift_products";

    private final static Long DEFAULT_QUANTITY = 1L;

    @Override
    public CartResponse getCart() {
        Cart cart = getCurrentUserCart();
        List<CartItem> cartItems = cart.getCartItems();

        for(CartItem ci : cartItems){
            ProductVariant variant = ci.getProductVariant();
            variant.setVariantImage(ImageNameToImageUrlConverter.convert(variant.getVariantImage(), variantImageFolderName));

            List<GiftProduct> giftProducts = variant.getGiftProducts();
            for(GiftProduct gp : giftProducts){
                gp.setThumbnail(ImageNameToImageUrlConverter.convert(gp.getThumbnail(), giftProductFolderName));
            }
        }

        return modelMapper.map(cart, CartResponse.class);
    }

    @Override
    @Transactional
    public void addItemsToCart(CartItemRequest cartItemRequest) {

        if(!productUtils.isActiveVariant(cartItemRequest.getProductVariantId())){
            throw new AppException(ErrorCode.VARIANT_INACTIVE);
        }

        ProductVariant productVariant = productVariantRepository.findById(cartItemRequest.getProductVariantId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));
        if(productVariant.getStock() == 0){
            throw new AppException(ErrorCode.PRODUCT_VARIANT_OUT_OF_STOCK);
        }

//        CartItem existingItem = cartItemRepository.findByProductVariantAndCart_User_Email(productVariant, SecurityUtils.extractNameFromAuthentication())
//                .orElse(null);
//        if(existingItem != null){
//            throw new AppException(ErrorCode.CART_ITEM_ALREADY_EXISTS);
//        }

        Cart cart = getCurrentUserCart();
        CartItem newItem = CartItem.builder()
                        .cart(cart)
                        .productVariant(productVariant)
                        .quantity(DEFAULT_QUANTITY)
                        .addedAt(LocalDateTime.now())
                        .createdAt(LocalDateTime.now())
                        .build();
        cart.getCartItems().add(newItem);
    }

    @Override
    @Transactional
    public void updateItemQuantity(ItemQuantityRequest itemQuantityRequest) {
        CartItem cartItem = cartItemRepository.findByIdAndCart_User_Email(itemQuantityRequest.getCartItemId(), SecurityUtils.extractNameFromAuthentication())
                        .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));
        cartItem.setQuantity(itemQuantityRequest.getQuantity());
    }

    @Override
    public void deleteCartItem(Long itemId) {
        CartItem cartItem = cartItemRepository.findByIdAndCart_User_Email(itemId, SecurityUtils.extractNameFromAuthentication())
                .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));
        cartItemRepository.delete(cartItem);
    }

    private Cart getCurrentUserCart(){
        return cartRepository.findByUser_Email(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));
    }


}
