//package com.sellphones.mapper;
//
//import com.sellphones.dto.product.response.AttributeValueResponse;
//import com.sellphones.dto.product.response.ProductDetailsResponse;
//import com.sellphones.entity.product.Product;
//import org.modelmapper.Converter;
//import org.modelmapper.PropertyMap;
//import org.modelmapper.spi.MappingContext;
//
//import java.util.List;
//
//public class ProductToProductDetailsResponsePropertyMap extends PropertyMap<Product, ProductDetailsResponse> {
//
//    private final Converter<Product, List<AttributeValueResponse>> attributeValuesConverter = new Converter<Product, List<AttributeValueResponse>>() {
//        @Override
//        public List<AttributeValueResponse> convert(MappingContext<Product, List<AttributeValueResponse>> mappingContext) {
//            Product source = mappingContext.getSource();
//            if (source == null || source.getAttributeValues() == null) {
//                return List.of();
//            }
//
//            return source.getAttributeValues().stream()
//                    .filter(av -> av.getProductVariant() == null)
//                    .map(av -> mappingContext.getMappingEngine()
//                            .map(mappingContext.create(av, AttributeValueResponse.class)))
//                    .toList();
//        }
//    };
//
//    @Override
//    protected void configure() {
//        using(attributeValuesConverter).map(source, destination.getAttributeValues());
//    }
//}
