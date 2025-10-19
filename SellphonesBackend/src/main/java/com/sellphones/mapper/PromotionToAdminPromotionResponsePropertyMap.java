package com.sellphones.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.dto.promotion.admin.AdminProductPromotionResponse;
import com.sellphones.entity.promotion.ProductPromotion;
import lombok.RequiredArgsConstructor;
import org.modelmapper.Converter;
import org.modelmapper.PropertyMap;
import org.modelmapper.spi.MappingContext;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class PromotionToAdminPromotionResponsePropertyMap extends PropertyMap<ProductPromotion, AdminProductPromotionResponse> {

    private final ObjectMapper objectMapper;

    private final Converter<String, Map<String, Object>> stringToMapConverter  = new Converter<String, Map<String, Object>>() {
        @Override
        public Map<String, Object> convert(MappingContext<String, Map<String, Object>> mappingContext) {
            String json = mappingContext.getSource();
            if (json == null || json.isBlank()) {
                return null;
            }

            try{
                return objectMapper.readValue(json, new TypeReference<Map<String, Object>>() {});
            }catch (JsonProcessingException e){
                throw new RuntimeException("Invalid JSON config: " + json, e);
            }
        }
    };

    @Override
    protected void configure() {
        using(stringToMapConverter).map(source.getConfig(), destination.getConfig());
        using(stringToMapConverter).map(source.getCondition(), destination.getCondition());
    }
}
