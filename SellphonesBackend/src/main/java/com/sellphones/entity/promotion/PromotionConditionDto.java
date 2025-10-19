package com.sellphones.entity.promotion;


import com.sellphones.entity.payment.PaymentMethodType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PromotionConditionDto {

    private List<PaymentMethodType> paymentMethodTypes;

}
