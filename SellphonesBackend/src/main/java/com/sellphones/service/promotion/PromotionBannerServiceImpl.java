package com.sellphones.service.promotion;

import com.sellphones.dto.promotion.PromotionBannerResponse;
import com.sellphones.entity.promotion.BannerStatus;
import com.sellphones.entity.promotion.PromotionBanner;
import com.sellphones.repository.promotion.PromotionBannerRepository;
import com.sellphones.utils.ImageNameToImageUrlConverter;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PromotionBannerServiceImpl implements PromotionBannerService{

    private final PromotionBannerRepository promotionBannerRepository;

    private final ModelMapper modelMapper;

    private final String promotionBannerFolderName = "promotion_banners";

    @Override
    public List<PromotionBannerResponse> getAllPromotionBanners() {
        List<PromotionBanner> promotionBanners = promotionBannerRepository.findByStatus(BannerStatus.ACTIVE);
        return promotionBanners.stream()
                .map(promotionBanner -> {
                    promotionBanner.setImage(ImageNameToImageUrlConverter.convert(promotionBanner.getImage(), promotionBannerFolderName));
                    return modelMapper.map(promotionBanner, PromotionBannerResponse.class);
                })
                .collect(Collectors.toList());
    }
}
