package com.sellphones.service.order;

import com.sellphones.dto.product.OrderVariant_ProductVariantRequest;
import com.sellphones.entity.order.OrderStatus;
import com.sellphones.repository.order.OrderVariantRepository;
import com.sellphones.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class OrderVariantServiceImpl implements OrderVariantService{

    private final OrderVariantRepository orderVariantRepository;

    @Override
    public boolean hasPurchasedVariant(Long variantId) {
        return orderVariantRepository.countUserPurchasedVariant(
                SecurityUtils.extractNameFromAuthentication(),
                variantId,
                OrderStatus.DELIVERED
        ) > 0;
    }
}
