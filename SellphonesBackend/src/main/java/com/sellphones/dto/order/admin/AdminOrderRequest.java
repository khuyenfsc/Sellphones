package com.sellphones.dto.order.admin;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminOrderRequest {

    @NotNull
    private Map<Long, Map<String, Long>> variants;

    @NotNull
    private Long paymentMethodId;

    @NotNull
    private Long customerInfoId;
}
