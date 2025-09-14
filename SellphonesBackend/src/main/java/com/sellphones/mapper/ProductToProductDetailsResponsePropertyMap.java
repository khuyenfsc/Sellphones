package com.sellphones.mapper;

import com.sellphones.dto.product.response.ProductAttributeValueResponse;
import com.sellphones.dto.product.response.ProductDetailsResponse;
import com.sellphones.entity.product.Product;
import org.modelmapper.Converter;
import org.modelmapper.PropertyMap;
import org.modelmapper.spi.MappingContext;

import java.util.List;

public class ProductToProductDetailsResponsePropertyMap extends PropertyMap<Product, ProductDetailsResponse> {

    private final Converter<Product, List<ProductAttributeValueResponse>> attributeValuesConverter = new Converter<Product, List<ProductAttributeValueResponse>>() {
        @Override
        public List<ProductAttributeValueResponse> convert(MappingContext<Product, List<ProductAttributeValueResponse>> mappingContext) {
            Product source = mappingContext.getSource();
            if (source == null || source.getAttributeValues() == null) {
                return List.of();
            }

            return source.getAttributeValues().stream()
                    .filter(av -> av.getProductVariant() == null)
                    .map(av -> mappingContext.getMappingEngine()
                            .map(mappingContext.create(av, ProductAttributeValueResponse.class)))
                    .toList();
        }
    };

    @Override
    protected void configure() {
        using(attributeValuesConverter).map(source, destination.getAttributeValues());
    }
}
