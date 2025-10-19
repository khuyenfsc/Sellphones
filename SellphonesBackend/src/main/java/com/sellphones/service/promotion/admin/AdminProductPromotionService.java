package com.sellphones.service.promotion.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.promotion.admin.AdminProductPromotionFilterRequest;
import com.sellphones.dto.promotion.admin.AdminProductPromotionRequest;
import com.sellphones.dto.promotion.admin.AdminProductPromotionResponse;

public interface AdminProductPromotionService {
    PageResponse<AdminProductPromotionResponse> getProductPromotions(AdminProductPromotionFilterRequest request);
    void createProductPromotion(AdminProductPromotionRequest  request);
    void editProductPromotion(AdminProductPromotionRequest request, Long id);
    void deleteProductPromotion(Long id);
}
