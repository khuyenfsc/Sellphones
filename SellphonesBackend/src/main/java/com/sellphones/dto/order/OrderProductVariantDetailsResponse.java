package com.sellphones.dto.order;

import com.sellphones.dto.promotion.GiftProductListResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderProductVariantDetailsResponse {

    private String productVariantName;

    private BigDecimal price;

    private String variantImage;

    private List<GiftProductListResponse> giftProducts;

}
