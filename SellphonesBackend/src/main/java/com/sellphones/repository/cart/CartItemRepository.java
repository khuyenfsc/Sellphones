package com.sellphones.repository.cart;

import com.sellphones.entity.cart.CartItem;
import com.sellphones.entity.product.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByIdAndCart_User_Email(Long id, String email);
    Optional<CartItem> findByProductVariantAndCart_User_Email(ProductVariant productVariant, String email);
    List<CartItem> findByCart_User_EmailAndIdIn(String email, List<Long> cartItemIds);
    void deleteByCart_User_EmailAndIdIn(String email, List<Long> cartItemIds);
}
