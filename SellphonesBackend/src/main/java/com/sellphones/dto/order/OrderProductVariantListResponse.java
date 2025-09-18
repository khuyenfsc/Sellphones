package com.sellphones.dto.order;

import com.sellphones.dto.product.response.WarrantyResponse;
import com.sellphones.entity.product.Warranty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderProductVariantListResponse {

    private String productVariantName;

    private BigDecimal price;

    private String variantImage;


}
