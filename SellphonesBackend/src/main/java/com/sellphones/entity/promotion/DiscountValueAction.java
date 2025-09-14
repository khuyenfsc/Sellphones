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
public class DiscountValueAction implements PromotionAction{

    private final ObjectMapper objectMapper;

    @Override
    @SneakyThrows(JsonProcessingException.class)
    public void apply(OrderVariant orderVariant, String configJson) {
        JsonNode json = objectMapper.readTree(configJson);
        BigDecimal amount = json.get("amount").decimalValue();
        orderVariant.setTotalPrice(orderVariant.getTotalPrice().subtract(amount.multiply(new BigDecimal(orderVariant.getQuantity()))));
    }
}
