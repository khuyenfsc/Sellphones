//package com.sellphones.mapper;
//
//import com.sellphones.dto.product.response.ProductListResponse;
//import com.sellphones.entity.product.Product;
//import org.modelmapper.Converter;
//import org.modelmapper.spi.MappingContext;
//
//public class ProductToProductListResponseConverter implements Converter<Product, ProductListResponse> {
//
//    @Override
//    public ProductListResponse convert(MappingContext<Product, ProductListResponse> mappingContext) {
//        Product source = mappingContext.getSource();
//        ProductListResponse dest = new ProductListResponse();
//        dest.setName(source.getName());
//        dest.setThumbnailUrl(source.getThumbnailUrl());
//        if(source.getProductVariants() != null && !source.getProductVariants().isEmpty()){
//            dest.setPrice(source.getProductVariants().getFirst().getPrice());
//        }
//        return dest;
//    }
//}
