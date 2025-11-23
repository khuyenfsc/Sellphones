package com.sellphones.mapper;

import com.sellphones.constant.AppConstants;
import com.sellphones.dto.product.CartItemVariantResponse;
//import com.sellphones.dto.product.ProductPromotionResponse;
import com.sellphones.dto.product.ProductVariantResponse;
import com.sellphones.dto.product.admin.AdminProductRequest;
import com.sellphones.dto.product.admin.AdminProductVariantRequest;
import com.sellphones.dto.product.admin.AdminUpdateProductRequest;
import com.sellphones.dto.product.admin.AdminUpdateProductVariantRequest;
import com.sellphones.dto.promotion.GiftProductResponse;
import com.sellphones.dto.promotion.ProductPromotionResponse;
import com.sellphones.entity.product.*;
import com.sellphones.entity.promotion.GiftProduct;
import com.sellphones.entity.promotion.ProductPromotion;
import com.sellphones.utils.ImageNameToImageUrlConverter;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.internal.bytebuddy.utility.RandomString;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ProductMapper {

    private final ModelMapper modelMapper;

    public Product mapToCreatedProductEntity(
        AdminProductRequest request,
        Brand brand,
        Category category,
        String thumbnailName,
        List<String> imageNames
    ){

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

    public ProductVariantResponse mapToProductVariantResponse(
        ProductVariant productVariant,
        List<ProductPromotion> promotions,
        List<GiftProduct> giftProducts
    ){
        ProductVariantResponse response = modelMapper.map(productVariant, ProductVariantResponse.class);

        response.setPromotions(
                promotions.stream()
                        .map(p -> modelMapper.map(p, ProductPromotionResponse.class))
                        .toList()
        );

        response.setVariantImage(ImageNameToImageUrlConverter.convert(
                productVariant.getVariantImage(), AppConstants.PRODUCT_VARIANT_IMAGE_FOLDER));

        response.setGiftProducts(
                giftProducts.stream()
                        .map(gp -> {
                            GiftProductResponse r = modelMapper.map(gp, GiftProductResponse.class);
                            r.setThumbnail(ImageNameToImageUrlConverter.convert(r.getThumbnail(), AppConstants.GIFT_PRODUCT_IMAGE_FOLDER));
                            return r;
                        }).toList()
        );

        return  response;
    }

    public CartItemVariantResponse mapToCartItemVariantResponse(
            ProductVariant productVariant,
            List<ProductPromotion> promotions,
            List<GiftProduct> giftProducts
    ){
        CartItemVariantResponse response = modelMapper.map(productVariant, CartItemVariantResponse.class);
        response.setPromotions(
                promotions == null
                        ? List.of()
                        : promotions.stream()
                        .map(p -> modelMapper.map(p, ProductPromotionResponse.class))
                        .toList()
        );

        response.setVariantImage(ImageNameToImageUrlConverter.convert(
                productVariant.getVariantImage(), AppConstants.PRODUCT_VARIANT_IMAGE_FOLDER));

        response.setGiftProducts(
                giftProducts.stream()
                        .map(gp -> {
                            GiftProductResponse r = modelMapper.map(gp, GiftProductResponse.class);
                            r.setThumbnail(ImageNameToImageUrlConverter.convert(r.getThumbnail(), AppConstants.GIFT_PRODUCT_IMAGE_FOLDER));
                            return r;
                        }).toList()
        );

        return  response;
    }

    public Product mapToEditedProductEntity(
        Product product,
        AdminUpdateProductRequest request,
        Brand brand,
        Category category,
        String thumbnailName,
        List<String> imageNames
    ){

        product.setCategory(category);
        product.setBrand(brand);
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setThumbnail(thumbnailName);
        product.setImages(imageNames);
        product.setStatus(request.getStatus());
        product.setIsFeatured(request.getIsFeatured());
        product.setIsNew(request.getIsNew());
        product.setVariantAttributeNames(request.getVariantAttributeNames());

        return product;
    }

    public ProductVariant mapToCreatedVariantEntity(
            AdminProductVariantRequest request,
            String variantImage,
            Product product
    ){

        ProductVariant productVariant = ProductVariant.builder()
                .productVariantName(request.getProductVariantName())
                .rootPrice(request.getRootPrice())
                .status(ProductStatus.INACTIVE)
                .product(product)
                .sku(generateSku(product.getCategory().getCode()))
                .createdAt(LocalDateTime.now())
                .variantImage(variantImage)
                .build();
        return productVariant;
    }

    public ProductVariant mapToEditedProductVariantEntity(
            ProductVariant variant,
            AdminUpdateProductVariantRequest request,
            String variantImage,
            List<ProductPromotion> promotions,
            List<GiftProduct> giftProducts,
            List<AttributeValue> attributeValues,
            List<Warranty> warranties
    ){

        variant.setProductVariantName(request.getProductVariantName());
        variant.setRootPrice(request.getRootPrice());
        variant.setCurrentPrice(request.getCurrentPrice());
        variant.setStatus(request.getStatus());
        variant.setVariantImage(variantImage);
        variant.setPromotions(promotions);
        variant.setGiftProducts(giftProducts);
        variant.setAttributeValues(attributeValues);
        variant.setWarranties(warranties);
        variant.setVariantAttributeValues(request.getVariantAttributeValues());

        return variant;
    }

    private String generateSku(String categoryCode){
        String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyMMdd"));
        String randomPart = RandomString.make(4).toUpperCase();
        return String.format("%s-%s-%s", categoryCode.toUpperCase(), datePart, randomPart);
    }

}
