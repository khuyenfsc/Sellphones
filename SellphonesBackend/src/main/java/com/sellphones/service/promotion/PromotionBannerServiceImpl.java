package com.sellphones.service.promotion;

import com.sellphones.dto.promotion.PromotionBannerResponse;
import com.sellphones.entity.promotion.PromotionBanner;
import com.sellphones.repository.promotion.PromotionBannerRepository;
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

    @Override
    public List<PromotionBannerResponse> getAllPromotionBanners() {
        List<PromotionBanner> promotionBanners = promotionBannerRepository.findAll();
        return promotionBanners.stream()
                .map(promotionBanner -> modelMapper.map(promotionBanner, PromotionBannerResponse.class))
                .collect(Collectors.toList());
    }
}
