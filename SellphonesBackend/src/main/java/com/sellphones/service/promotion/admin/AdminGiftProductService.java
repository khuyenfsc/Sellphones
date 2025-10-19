package com.sellphones.service.promotion.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.promotion.admin.AdminGiftProductFilterRequest;
import com.sellphones.dto.promotion.admin.AdminGiftProductResponse;
import com.sellphones.entity.promotion.GiftProduct;
import org.springframework.web.multipart.MultipartFile;

public interface AdminGiftProductService {
    PageResponse<AdminGiftProductResponse> getGiftProducts(AdminGiftProductFilterRequest request);
    void createGiftProduct(String giftProductJson, MultipartFile thumbnailFile);
    void editGiftProduct(String giftProductJson, MultipartFile thumbnailFile, Long id);
    void deleteGiftProduct(Long id);
}
