package com.sellphones.dto.product;

import com.sellphones.dto.promotion.GiftProductListResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order_ProductVariantDetailsResponse {

    private Long id;

    private String productVariantName;

    private BigDecimal currentPrice;

    private String variantImage;

    private Order_ProductResponse product;

    private List<GiftProductListResponse> giftProducts;

}
