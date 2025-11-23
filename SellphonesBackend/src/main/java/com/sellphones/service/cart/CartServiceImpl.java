package com.sellphones.service.cart;

import com.sellphones.dto.cart.CartItemRequest;
import com.sellphones.dto.cart.CartItemResponse;
import com.sellphones.dto.cart.CartResponse;
import com.sellphones.dto.cart.ItemQuantityRequest;
import com.sellphones.dto.product.CartItemVariantResponse;
import com.sellphones.entity.cart.Cart;
import com.sellphones.entity.cart.CartItem;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.promotion.GiftProduct;
import com.sellphones.entity.promotion.ProductPromotion;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.ProductMapper;
import com.sellphones.repository.cart.CartItemRepository;
import com.sellphones.repository.cart.CartRepository;
import com.sellphones.repository.product.ProductVariantRepository;
import com.sellphones.repository.promotion.ProductPromotionRepository;
import com.sellphones.utils.ImageNameToImageUrlConverter;
import com.sellphones.utils.ProductUtils;
import com.sellphones.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;

    private final ModelMapper modelMapper;

    private final ProductMapper productMapper;

    private final ProductVariantRepository productVariantRepository;

    private final CartItemRepository cartItemRepository;

    private final ProductPromotionRepository productPromotionRepository;

    private final ProductUtils productUtils;

    private final static Long DEFAULT_QUANTITY = 1L;

    @Override
    public CartResponse getCart() {
        Cart cart = getCurrentUserCart();
        CartResponse response = modelMapper.map(cart, CartResponse.class);

        List<CartItem> cartItems = cart.getCartItems();

        List<Long> variantIds = cartItems.stream()
                .map(ci -> ci.getProductVariant().getId())
                .toList();
        Set<ProductPromotion> allPromotions = productPromotionRepository.findActivePromotionsByVariantIds(variantIds);

        Map<Long, List<ProductPromotion>> promotionMap = allPromotions.stream()
                .flatMap(p -> p.getProductVariants().stream()
                    .map(v -> Map.entry(v.getId(), p))
                )
                .collect(Collectors.groupingBy(Map.Entry::getKey,
                    Collectors.mapping(Map.Entry::getValue, Collectors.toList()))
                );

        response.setCartItems(
            cartItems.stream()
                    .map(item -> {
                        ProductVariant variant = item.getProductVariant();
                        CartItemResponse resp = modelMapper.map(item, CartItemResponse.class);

                        CartItemVariantResponse itemVariantResponse = productMapper.mapToCartItemVariantResponse(
                                variant, promotionMap.get(variant.getId()), variant.getGiftProducts()
                        );
                        resp.setProductVariant(itemVariantResponse);

                        return resp;
                    }).toList()
        );

        return response;
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
