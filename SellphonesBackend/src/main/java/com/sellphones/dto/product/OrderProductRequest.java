package com.sellphones.dto.product;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderProductRequest {

    @NotNull
    private Long cartItemId;

    private Long warrantyId;

//    private List<Long> promotionIds;

}
