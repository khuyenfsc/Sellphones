package com.sellphones.service.order;

import com.sellphones.dto.product.OrderVariant_ProductVariantRequest;

public interface OrderVariantService {
    boolean hasPurchasedVariant(Long variantId);
}
