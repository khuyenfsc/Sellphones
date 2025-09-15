package com.sellphones.entity.promotion;


import com.sellphones.entity.payment.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PromotionConditionDto {

    private List<PaymentMethod> paymentMethods;

}
