package com.sellphones.service.order;

import com.sellphones.dto.dashboard.DashboardRequest;
import com.sellphones.dto.product.OrderVariant_ProductVariantRequest;
import com.sellphones.dto.product.admin.AdminProductVariantListResponse;
import com.sellphones.entity.order.OrderStatus;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.order.OrderVariantRepository;
import com.sellphones.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;


@Service
@RequiredArgsConstructor
public class OrderVariantServiceImpl implements OrderVariantService{

    private final OrderVariantRepository orderVariantRepository;

    private final ModelMapper modelMapper;

    @Override
    public boolean hasPurchasedVariant(Long variantId) {
        return orderVariantRepository.countUserPurchasedVariant(
                SecurityUtils.extractNameFromAuthentication(),
                variantId,
                OrderStatus.DELIVERED
        ) > 0;
    }


}
