package com.sellphones.dto.order.admin;

import com.sellphones.dto.customer.admin.AdminCustomerInfoResponse;
import com.sellphones.dto.order.OrderVariantListResponse;
import com.sellphones.entity.customer.CustomerInfo;
import com.sellphones.entity.order.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminShipment_OrderResponse {

    private Long id;

    private String code;

    private List<OrderVariantListResponse> orderVariants;

    private LocalDateTime orderedAt;

    private OrderStatus orderStatus;

    private AdminCustomerInfoResponse customerInfo;

}
