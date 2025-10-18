package com.sellphones.dto.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderProductRequest {

    private Long cartItemId;

    private Long warrantyId;

    private List<Long> promotionIds;

}
