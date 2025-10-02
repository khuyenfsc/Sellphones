package com.sellphones.service.order.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.OrderListResponse;
import com.sellphones.dto.order.admin.AdminOrderFilterRequest;
import com.sellphones.entity.order.Order;
import com.sellphones.repository.order.OrderRepository;
import com.sellphones.specification.admin.AdminOrderSpecificationBuilder;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminOrderServiceImpl implements AdminOrderService{

    private final OrderRepository orderRepository;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('SALES.ORDERS.VIEW')")
    public PageResponse<OrderListResponse> getOrders(AdminOrderFilterRequest request) {
        Specification<Order> spec = AdminOrderSpecificationBuilder.build(request);
        Sort sort = Sort.by(Sort.Direction.DESC, "orderedAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Page<Order> orderPage = orderRepository.findAll(spec, pageable);
        List<Order> orders = orderPage.getContent();
        List<OrderListResponse> responses = orders.stream()
                .map(o -> modelMapper.map(o, OrderListResponse.class))
                .toList();

        return PageResponse.<OrderListResponse>builder()
                .result(responses)
                .total(orderPage.getTotalElements())
                .totalPages(orderPage.getTotalPages())
                .build();
    }

}
