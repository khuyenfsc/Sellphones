package com.sellphones.mapper;

import com.sellphones.dto.product.admin.AdminProductRequest;
import com.sellphones.dto.product.admin.AdminProductVariantRequest;
import com.sellphones.entity.product.*;
import com.sellphones.entity.promotion.GiftProduct;
import com.sellphones.entity.promotion.ProductPromotion;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.product.AttributeValueRepository;
import com.sellphones.repository.product.BrandRepository;
import com.sellphones.repository.product.CategoryRepository;
import com.sellphones.repository.product.WarrantyRepository;
import com.sellphones.repository.promotion.GiftProductRepository;
import com.sellphones.repository.promotion.ProductPromotionRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.internal.bytebuddy.utility.RandomString;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ProductMapper {

    private final CategoryRepository categoryRepository;

    private final BrandRepository brandRepository;

    private final AttributeValueRepository attributeValueRepository;

    private final ProductPromotionRepository productPromotionRepository;

    private final GiftProductRepository giftProductRepository;

    private final WarrantyRepository warrantyRepository;

    public Product mapToProductEntity(AdminProductRequest request, String thumbnailName, List<String> imageNames){
        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        Brand brand = brandRepository.findById(request.getBrandId()).orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));
        Product product = Product.builder()
                .category(category)
                .brand(brand)
                .name(request.getName())
                .description(request.getDescription())
                .thumbnail(thumbnailName)
                .images(imageNames)
                .build();

        return product;
    }

    public ProductVariant mapToProductVariantEntity(AdminProductVariantRequest request, String variantImage, Product product){
        List<ProductPromotion> promotions = new ArrayList<>();
        List<GiftProduct> giftProducts = new ArrayList<>();
        List<AttributeValue> attributeValues = new ArrayList<>();
        List<Warranty> warranties = new ArrayList<>();

        if (request.getPromotionIds() != null){
            promotions = productPromotionRepository.findByIdIn(request.getPromotionIds());
        }

        if(request.getGiftProductIds() != null){
            giftProducts = giftProductRepository.findByIdIn(request.getGiftProductIds());
        }

        if(request.getAttributeValueIds() != null){
            attributeValues = attributeValueRepository.findByIdIn(request.getAttributeValueIds());
        }

        if(request.getWarrantyIds() != null){
            warranties = warrantyRepository.findByIdIn(request.getWarrantyIds());
        }

        ProductVariant productVariant = ProductVariant.builder()
                .productVariantName(request.getProductVariantName())
                .price(request.getPrice())
                .status(ProductVariantStatus.ACTIVE)
                .sku(generateSku(product.getCategory().getCode()))
                .variantImage(variantImage)
                .product(product)
                .promotions(promotions)
                .giftProducts(giftProducts)
                .attributeValues(attributeValues)
                .stock(request.getStock())
                .warranties(warranties)
                .build();

        return productVariant;
    }

    private String generateSku(String categoryCode){
        String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyMMdd"));
        String randomPart = RandomString.make(4).toUpperCase();
        return String.format("%s-%s-%s", categoryCode.toUpperCase(), datePart, randomPart);
    }

}
