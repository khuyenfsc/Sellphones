package com.sellphones.mapper;

import com.sellphones.constant.AppConstants;
import com.sellphones.dto.product.response.ReviewResponse;
import com.sellphones.entity.product.Review;
import org.modelmapper.Converter;
import org.modelmapper.PropertyMap;
import org.modelmapper.spi.MappingContext;

import java.util.List;

public class ReviewToReviewResponsePropertyMap extends PropertyMap<Review, ReviewResponse> {

    private final Converter<List<String>, List<String>> imageNamesToImageUrlsConverter = new Converter<List<String>, List<String>>() {
        @Override
        public List<String> convert(MappingContext<List<String>, List<String>> mappingContext) {
            if(mappingContext.getSource() == null){
                return null;
            }

            return mappingContext.getSource().stream().map(in -> AppConstants.BASE_URL + "uploads/reviews/" + in).toList();
        }
    };

    @Override
    protected void configure() {
        using(imageNamesToImageUrlsConverter).map(source.getImageNames(), destination.getImageNames());
    }
}
