package com.sellphones.service.order.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.dashboard.DashboardRequest;
import com.sellphones.dto.order.OrderResponse;
import com.sellphones.dto.order.admin.AdminOrderFilterRequest;
import com.sellphones.dto.order.admin.AdminOrderListResponse;
import com.sellphones.dto.order.admin.AdminShipmentInventoryItem;
import com.sellphones.dto.order.admin.AdminShipmentRequest;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.address.AddressType;
import com.sellphones.entity.inventory.Inventory;
import com.sellphones.entity.order.Order;
import com.sellphones.entity.order.OrderStatus;
import com.sellphones.entity.order.OrderVariant;
import com.sellphones.entity.order.Shipment;
import com.sellphones.entity.payment.PaymentStatus;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.address.AddressRepository;
import com.sellphones.repository.inventory.InventoryRepository;
import com.sellphones.repository.order.OrderRepository;
import com.sellphones.repository.order.ShipmentRepository;
import com.sellphones.service.payment.PaymentService;
import com.sellphones.specification.admin.AdminOrderSpecificationBuilder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminOrderServiceImpl implements AdminOrderService{

    private final OrderRepository orderRepository;

    private final ShipmentRepository shipmentRepository;

    private final InventoryRepository inventoryRepository;

    private final AddressRepository addressRepository;

    private final PaymentService paymentService;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('SALES.ORDERS.VIEW')")
    public PageResponse<AdminOrderListResponse> getOrders(AdminOrderFilterRequest request) {
        Specification<Order> spec = AdminOrderSpecificationBuilder.build(request);
        Sort sort = Sort.by(Sort.Direction.DESC, "orderedAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Page<Order> orderPage = orderRepository.findAll(spec, pageable);
        List<Order> orders = orderPage.getContent();
        List<AdminOrderListResponse> response = orders.stream()
                .map(o -> modelMapper.map(o, AdminOrderListResponse.class))
                .toList();

        return PageResponse.<AdminOrderListResponse>builder()
                .result(response)
                .total(orderPage.getTotalElements())
                .totalPages(orderPage.getTotalPages())
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('SALES.ORDERS.EDIT')")
    @Transactional
    public void confirmOrder(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        if(order.getOrderStatus() != OrderStatus.PENDING){
            throw new AppException(ErrorCode.INVALID_STATUS_TRANSITION);
        }

        order.setOrderStatus(OrderStatus.CONFIRMED);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyAuthority('SALES.ORDERS.EDIT', 'SALES.SHIPMENTS.CREATE')")
    public void shipOrder(AdminShipmentRequest request, Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        if(order.getOrderStatus() != OrderStatus.CONFIRMED){
            throw new AppException(ErrorCode.INVALID_STATUS_TRANSITION);
        }
        if (request.getInventoryItems() == null || request.getInventoryItems().isEmpty()) {
            throw new AppException(ErrorCode.INVALID_SHIPMENT_ITEMS);
        }


        Map<Long, Long> inventoryQuantityMap = request.getInventoryItems().stream()
                .collect(Collectors.toMap(AdminShipmentInventoryItem::getInventoryId, AdminShipmentInventoryItem::getQuantity));
        List<Inventory> inventories = inventoryRepository.findByIdIn(inventoryQuantityMap.keySet());
        for(Inventory inventory : inventories){
            Long quantity = inventoryQuantityMap.get(inventory.getId());
            if(quantity > inventory.getQuantity()){
                throw new AppException(ErrorCode.PRODUCT_VARIANT_OUT_OF_STOCK);
            }

            inventory.setQuantity(inventory.getQuantity() - quantity);
        }

        Address address = addressRepository.findByIdAndAddressType(request.getPickupAddressId(), AddressType.PICKUP)
                .orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_FOUND));
        Shipment shipment = Shipment.builder()
                .code(request.getCode())
                .shippingPrice(new BigDecimal(request.getShippingPrice()))
                .deliveryPartner(request.getPartner())
                .pickupAddress(address)
                .expectedDeliveryDate(request.getExpectedDeliveryDate())
                .order(order)
                .createdAt(LocalDateTime.now())
                .build();

        shipmentRepository.save(shipment);
        order.setOrderStatus(OrderStatus.SHIPPING);
    }

    @Override
    @PreAuthorize("hasAuthority('SALES.ORDERS.EDIT')")
    @Transactional
    public void deliverOrder(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        if(order.getOrderStatus() != OrderStatus.SHIPPING){
            throw new AppException(ErrorCode.INVALID_STATUS_TRANSITION);
        }

        order.getShipment().setDeliveryDate(LocalDate.now());
        order.setOrderStatus(OrderStatus.DELIVERED);
    }

    @Override
    @PreAuthorize("hasAuthority('SALES.ORDERS.EDIT')")
    @Transactional
    public void cancelOrder(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        if (order.getOrderStatus() != OrderStatus.WAIT_FOR_CANCELLING
                && order.getOrderStatus() != OrderStatus.PENDING
                && order.getOrderStatus() != OrderStatus.CONFIRMED) {
            throw new AppException(ErrorCode.INVALID_STATUS_TRANSITION);
        }

        order.setOrderStatus(OrderStatus.CANCELED);
        for (OrderVariant ov : order.getOrderVariants()) {
            ProductVariant variant = ov.getProductVariant();
            variant.setStock(variant.getStock() + ov.getQuantity());
        }
        ;
        if(order.getPayment().getStatus() == PaymentStatus.COMPLETED){
//            paymentService.refund(order);
            order.getPayment().setStatus(PaymentStatus.REFUNDED);
        }
    }


}
