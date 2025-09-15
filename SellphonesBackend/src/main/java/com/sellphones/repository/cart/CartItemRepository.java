package com.sellphones.repository.cart;

import com.sellphones.entity.cart.CartItem;
import com.sellphones.entity.product.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByIdAndCart_User_Email(Long id, String email);
    Optional<CartItem> findByProductVariantAndCart_User_Email(ProductVariant productVariant, String email);
}
