package com.sellphones.mapper;

import com.sellphones.dto.product.admin.AdminProductRequest;
import com.sellphones.dto.product.admin.AdminProductVariantRequest;
import com.sellphones.entity.product.*;
import com.sellphones.entity.promotion.GiftProduct;
import com.sellphones.entity.promotion.ProductPromotion;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.modelmapper.internal.bytebuddy.utility.RandomString;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ProductMapper {

    public Product mapToProductEntity(AdminProductRequest request, Brand brand, Category category, String thumbnailName, List<String> imageNames){

        return Product.builder()
                .category(category)
                .brand(brand)
                .name(request.getName())
                .description(request.getDescription())
                .thumbnail(thumbnailName)
                .images(imageNames)
                .createdAt(LocalDateTime.now())
                .build();
    }

    public ProductVariant mapToProductVariantEntity(
            AdminProductVariantRequest request,
            String variantImage, @Nullable Product product,
            List<ProductPromotion> promotions,
            List<GiftProduct> giftProducts,
            List<AttributeValue> attributeValues,
            List<Warranty> warranties
    ){

        ProductVariant productVariant = ProductVariant.builder()
                .productVariantName(request.getProductVariantName())
                .rootPrice(request.getRootPrice())
                .currentPrice(request.getCurrentPrice())
                .status(request.getStatus())
                .variantImage(variantImage)
                .promotions(promotions)
                .giftProducts(giftProducts)
                .attributeValues(attributeValues)
                .warranties(warranties)
                .build();

        if(product != null){
            productVariant.setProduct(product);
            productVariant.setSku(generateSku(product.getCategory().getCode()));
            productVariant.setCreatedAt(LocalDateTime.now());
        }

        return productVariant;
    }

    private String generateSku(String categoryCode){
        String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyMMdd"));
        String randomPart = RandomString.make(4).toUpperCase();
        return String.format("%s-%s-%s", categoryCode.toUpperCase(), datePart, randomPart);
    }

}
