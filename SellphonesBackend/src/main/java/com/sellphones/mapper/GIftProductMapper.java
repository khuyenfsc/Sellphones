package com.sellphones.mapper;

import com.sellphones.dto.promotion.admin.AdminGiftProductRequest;
import com.sellphones.entity.promotion.GiftProduct;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
public class GIftProductMapper {

    public GiftProduct mapToGiftProductEntity(AdminGiftProductRequest request, String thumbnailName){
        GiftProduct giftProduct = GiftProduct.builder()
                .name(request.getName())
                .stock(request.getStock())
                .description(request.getDescription())
                .thumbnail(thumbnailName)
                .price(BigDecimal.valueOf(request.getPrice()))
                .createdAt(LocalDateTime.now())
                .build();

        return giftProduct;
    }

}
