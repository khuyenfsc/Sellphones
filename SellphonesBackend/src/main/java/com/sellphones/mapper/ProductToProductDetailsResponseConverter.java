//package com.sellphones.mapper;
//
//import com.sellphones.dto.product.response.ProductAttributeValueResponse;
//import com.sellphones.dto.product.response.ProductDetailsResponse;
//import com.sellphones.entity.product.Product;
//import org.modelmapper.Converter;
//import org.modelmapper.spi.MappingContext;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.stream.Collectors;
//
//public class ProductToProductDetailsResponseConverter implements Converter<Product, ProductDetailsResponse> {
//
//    @Override
//    public ProductDetailsResponse convert(MappingContext<Product, ProductDetailsResponse> mappingContext) {
//        Product source = mappingContext.getSource();
//
//        ProductDetailsResponse dest = mappingContext.getMappingEngine().map(mappingContext.create(source, ProductDetailsResponse.class));
//        List<ProductAttributeValueResponse> customizedAttributes = source.getAttributeValues().stream()
//                .filter(av -> av.getProductVariant() == null)
//                .map(av -> mappingContext.getMappingEngine().map(mappingContext.create(av, ProductAttributeValueResponse.class)))
//                .toList();
//
//        dest.setAttributeValues(customizedAttributes);
//
//        return dest;
//    }
//}
