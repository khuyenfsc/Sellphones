package com.sellphones.utils;

import com.sellphones.entity.product.Product;
import com.sellphones.entity.product.ProductStatus;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.repository.product.ProductRepository;
import com.sellphones.repository.product.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductUtils {

    private final ProductRepository productRepository;

    private final ProductVariantRepository productVariantRepository;

    public boolean isActiveProduct(Long productId){
        return productRepository.existsByIdAndStatus(productId, ProductStatus.ACTIVE);
    }

    public boolean isActiveProduct(Product product){
        if(product.getStatus() != null){
            return product.getStatus() == ProductStatus.ACTIVE;
        }

        return false;
    }

    public boolean isActiveVariant(Long variantId){
        return productVariantRepository.existsByIdAndStatus(variantId, ProductStatus.ACTIVE);
    }

    public boolean isActiveVariant(ProductVariant variant){
        if(variant.getStatus() != null){
            return variant.getStatus() == ProductStatus.ACTIVE;
        }

        return false;
    }

}
