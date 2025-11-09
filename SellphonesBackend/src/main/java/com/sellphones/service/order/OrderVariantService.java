package com.sellphones.service.order;

import com.sellphones.dto.dashboard.DashboardRequest;
import com.sellphones.dto.product.OrderVariant_ProductVariantRequest;
import com.sellphones.dto.product.admin.AdminProductVariantListResponse;

import java.util.List;

public interface OrderVariantService {
    boolean hasPurchasedVariant(Long variantId);
}
