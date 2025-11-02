package com.sellphones.entity.promotion;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.entity.order.OrderVariant;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@RequiredArgsConstructor
@Component
public class DiscountValueAction implements PromotionAction{

    private final ObjectMapper objectMapper;

    @Override
    @SneakyThrows(JsonProcessingException.class)
    public void apply(OrderVariant orderVariant, String configJson) {
        JsonNode json = objectMapper.readTree(configJson);
        BigDecimal amount = json.get("amount").decimalValue();

        BigDecimal quantityBD = BigDecimal.valueOf(orderVariant.getQuantity());
        BigDecimal totalDiscount = amount.multiply(quantityBD);

        BigDecimal currentTotal = orderVariant.getTotalPrice() != null
                ? orderVariant.getTotalPrice()
                : BigDecimal.ZERO;
        BigDecimal newTotal = currentTotal.subtract(totalDiscount);

        if (newTotal.compareTo(BigDecimal.ZERO) < 0) {
            newTotal = BigDecimal.ZERO;
        }

        orderVariant.setDiscountAmount(
                orderVariant.getDiscountAmount().add(totalDiscount)
        );
        orderVariant.setTotalPrice(newTotal);
    }
}
