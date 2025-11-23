package com.sellphones.repository.cart;

import com.sellphones.entity.cart.CartItem;
import com.sellphones.entity.product.ProductStatus;
import com.sellphones.entity.product.ProductVariant;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByIdAndCart_User_Email(Long id, String email);
    Optional<CartItem> findByProductVariantAndCart_User_Email(ProductVariant productVariant, String email);

    @Query("""
        SELECT ci FROM CartItem ci
        WHERE ci.cart.user.email = :email
          AND ci.productVariant.status = :status
          AND ci.id IN :cartItemIds
    """)
    List<CartItem> findCartItems(String email, ProductStatus status, List<Long> cartItemIds);

    void deleteByCart_User_EmailAndIdIn(String email, List<Long> cartItemIds);
}
