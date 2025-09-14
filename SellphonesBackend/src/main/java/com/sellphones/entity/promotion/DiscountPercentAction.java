package com.sellphones.entity.promotion;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.entity.order.OrderVariant;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

import java.math.BigDecimal;

@NoArgsConstructor(force = true)
@RequiredArgsConstructor
public class DiscountPercentAction implements PromotionAction{

    private final ObjectMapper objectMapper;

    @Override
    @SneakyThrows(JsonProcessingException.class)
    public void apply(OrderVariant orderVariant, String configJson) {
        JsonNode json = objectMapper.readTree(configJson);
        int percent = json.get("percent").asInt();
        BigDecimal discount = orderVariant.getTotalPrice()
                .multiply(BigDecimal.valueOf(percent))
                .divide(BigDecimal.valueOf(100));

        orderVariant.setTotalPrice(orderVariant.getTotalPrice().subtract(discount));    }
}
