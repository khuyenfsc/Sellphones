package com.sellphones.service.order;

import com.sellphones.entity.order.OrderStatus;
import com.sellphones.repository.order.OrderVariantRepository;
import com.sellphones.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class OrderVariantServiceImpl implements OrderVariantService{

    private final OrderVariantRepository orderVariantRepository;

    private final ModelMapper modelMapper;

    @Override
    public boolean hasPurchasedVariant(Long variantId) {
        return orderVariantRepository.countPurchasedVariant(
                SecurityUtils.extractNameFromAuthentication(),
                variantId,
                OrderStatus.DELIVERED
        ) > 0;
    }


}
