package com.sellphones.service.promotion.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.promotion.admin.AdminPromotionBannerFilterRequest;
import com.sellphones.dto.promotion.admin.AdminPromotionBannerResponse;
import org.springframework.web.multipart.MultipartFile;

public interface AdminPromotionBannerService {
    PageResponse<AdminPromotionBannerResponse> getBanners(AdminPromotionBannerFilterRequest request);
    void createBanner(String bannerJson, MultipartFile imageFile);
    void editBanner(String bannerJson, MultipartFile imageFile, Long id);
    void deleteBanner(Long id);
}
