package com.sellphones.dto.cart;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemQuantityRequest {

    private Long cartItemId;

    @Min(value = 1L)
    private Long quantity;

}
