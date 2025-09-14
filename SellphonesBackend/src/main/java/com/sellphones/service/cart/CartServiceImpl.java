package com.sellphones.service.cart;

import com.sellphones.dto.cart.CartResponse;
import com.sellphones.entity.cart.Cart;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.cart.CartRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;

    private final ModelMapper modelMapper;

    @Override
    public CartResponse getCart() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Cart cart = cartRepository.findByUser_Email(email).orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));
        return modelMapper.map(cart, CartResponse.class);
    }
}
