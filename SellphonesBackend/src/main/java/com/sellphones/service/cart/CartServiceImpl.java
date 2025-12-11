package com.sellphones.service.cart;

import com.sellphones.dto.cart.CartItemRequest;
import com.sellphones.dto.cart.CartItemResponse;
import com.sellphones.dto.cart.CartResponse;
import com.sellphones.dto.cart.ItemQuantityRequest;
import com.sellphones.dto.product.CartItem_VariantResponse;
import com.sellphones.entity.cart.Cart;
import com.sellphones.entity.cart.CartItem;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.promotion.ProductPromotion;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.ProductMapper;
import com.sellphones.repository.cart.CartItemRepository;
import com.sellphones.repository.cart.CartRepository;
import com.sellphones.repository.product.ProductVariantRepository;
import com.sellphones.repository.promotion.ProductPromotionRepository;
import com.sellphones.utils.ProductUtils;
import com.sellphones.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
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
        List<Object[]> promotionRows = productPromotionRepository.findActivePromotionsByVariantIds(variantIds);
        Map<Long, List<ProductPromotion>> promotionsMap = promotionRows.stream()
                .collect(Collectors.groupingBy(
                        r -> (Long)r[0],
                        Collectors.mapping(
                                r -> (ProductPromotion)r[1],
                                Collectors.toList()
                        )
                ));


        response.setCartItems(
            cartItems.stream()
                    .map(item -> {
                        ProductVariant variant = item.getProductVariant();
                        CartItemResponse resp = modelMapper.map(item, CartItemResponse.class);

                        CartItem_VariantResponse itemVariantResponse = productMapper.mapToCartItemVariantResponse(
                                variant, promotionsMap.get(variant.getId()), variant.getGiftProducts()
                        );
                        resp.setProductVariant(itemVariantResponse);

                        return resp;
                    }).toList()
        );

        return response;
    }

    @Override
    public void addItemsToCart(CartItemRequest cartItemRequest) {

        if(!productUtils.isActiveVariant(cartItemRequest.getProductVariantId())){
            throw new AppException(ErrorCode.VARIANT_INACTIVE);
        }

        ProductVariant productVariant = productVariantRepository.findById(cartItemRequest.getProductVariantId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));
        if(productVariant.getStock() == 0){
            throw new AppException(ErrorCode.PRODUCT_VARIANT_OUT_OF_STOCK);
        }

        Cart cart = getCurrentUserCart();
        CartItem newItem = CartItem.builder()
                        .cart(cart)
                        .productVariant(productVariant)
                        .quantity(DEFAULT_QUANTITY)
                        .addedAt(LocalDateTime.now())
                        .createdAt(LocalDateTime.now())
                        .build();

        cartItemRepository.save(newItem);
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
