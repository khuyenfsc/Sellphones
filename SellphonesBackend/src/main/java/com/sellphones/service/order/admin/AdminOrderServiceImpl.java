package com.sellphones.service.order.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.OrderDetailResponse;
import com.sellphones.dto.order.admin.*;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.customer.CustomerInfo;
import com.sellphones.entity.inventory.Inventory;
import com.sellphones.entity.order.*;
import com.sellphones.entity.payment.PaymentStatus;
import com.sellphones.entity.product.ProductStatus;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.product.Warranty;
import com.sellphones.entity.promotion.OrderVariantPromotion;
import com.sellphones.entity.promotion.ProductPromotion;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.AddressMapper;
import com.sellphones.repository.address.AddressRepository;
import com.sellphones.repository.customer.CustomerInfoRepository;
import com.sellphones.repository.inventory.InventoryRepository;
import com.sellphones.repository.order.OrderRepository;
import com.sellphones.repository.order.ShipmentRepository;
import com.sellphones.repository.product.ProductVariantRepository;
import com.sellphones.repository.product.WarrantyRepository;
import com.sellphones.repository.promotion.GiftProductRepository;
import com.sellphones.repository.promotion.ProductPromotionRepository;
import com.sellphones.service.payment.PaymentService;
import com.sellphones.service.promotion.ProductPromotionService;
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
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminOrderServiceImpl implements AdminOrderService{

    private final OrderRepository orderRepository;

    private final ShipmentRepository shipmentRepository;

    private final InventoryRepository inventoryRepository;

    private final CustomerInfoRepository customerInfoRepository;

    private final WarrantyRepository warrantyRepository;

    private final ProductVariantRepository productVariantRepository;

    private final ProductPromotionRepository productPromotionRepository;

    private final GiftProductRepository giftProductRepository;

    private final PaymentService paymentService;

    private final ProductPromotionService productPromotionService;

    private final ModelMapper modelMapper;

    private final AddressMapper addressMapper;

    private final long paymentId = 1;

    @Override
    @PreAuthorize("""
    hasAnyAuthority(
        'SALES.ORDERS',
        'CUSTOMER.CUSTOMERS'
    )
    """)
    public PageResponse<AdminOrderResponse> getOrders(AdminOrder_FilterRequest request) {
        Specification<Order> spec = AdminOrderSpecificationBuilder.build(request);
        Sort sort = Sort.by(Sort.Direction.DESC, "orderedAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Page<Order> orderPage = orderRepository.findAll(spec, pageable);
        List<Order> orders = orderPage.getContent();
        List<AdminOrderResponse> response = orders.stream()
                .map(o -> modelMapper.map(o, AdminOrderResponse.class))
                .toList();

        return PageResponse.<AdminOrderResponse>builder()
                .result(response)
                .total(orderPage.getTotalElements())
                .totalPages(orderPage.getTotalPages())
                .build();
    }

    @Override
    @PreAuthorize("""
    hasAnyAuthority(
        'SALES.ORDERS',
        'CUSTOMER.CUSTOMERS'
    )
    """)
    public OrderDetailResponse getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        return modelMapper.map(order, OrderDetailResponse.class);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('SALES.ORDERS')")
    public void createOrder(AdminOrderRequest request) {
        Map<Long, Map<String, Long>> variants = request.getVariants();
        CustomerInfo customerInfo = customerInfoRepository.findById(request.getCustomerInfoId())
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
        User user = customerInfo.getUser();

        Order order = Order.builder()
                .user(user)
                .orderStatus(OrderStatus.PENDING)
                .orderedAt(LocalDateTime.now())
                .customerInfo(customerInfo)
                .build();

        Payment payment = paymentService.initPayment(paymentId);
        payment.setOrder(order);

        List<OrderVariant> orderVariants = makeOrderVariants(variants, order);
        order.setOrderVariants(orderVariants);
        order.setPayment(payment);
        calculateTotalPriceForOrder(order);

        Order savedOrder = orderRepository.save(order);

    }

    @Override
    @PreAuthorize("hasAuthority('SALES.ORDERS')")
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
    @PreAuthorize("hasAnyAuthority('SALES.ORDERS', 'SALES.SHIPMENTS')")
    public void shipOrder(AdminShipmentRequest request, Long id) {
        int updatedStatus = orderRepository.tryTransitionToShipping(id);
        if (updatedStatus == 0) {
            throw new AppException(ErrorCode.INVALID_STATUS_TRANSITION);
        }
        Order order = orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        if (request.getInventoryItems() == null || request.getInventoryItems().isEmpty()) {
            throw new AppException(ErrorCode.INVALID_SHIPMENT_ITEMS);
        }

        Set<Long> inventoryIds = request.getInventoryItems().keySet();
        List<Inventory> inventories = inventoryRepository.findByIdIn(inventoryIds);
        for(Inventory inventory : inventories){
            Map<String, Long> item = request.getInventoryItems().get(inventory.getId());
            Long quantity = item.get("quantity");
            if(!Objects.equals(item.get("variantId"), inventory.getProductVariant().getId())){
                throw new AppException(ErrorCode.VARIANT_NOT_IN_INVENTORY);
            }

            int updatedQuantity = inventoryRepository.safeIncreaseQuantity(inventory.getId(), -quantity);
            if (updatedQuantity == 0) {
                throw new AppException(ErrorCode.PRODUCT_VARIANT_OUT_OF_STOCK);
            }
        }

        Address pickupAddress = addressMapper.mapToAddressEntity(request.getPickupAddress());
        Shipment shipment = Shipment.builder()
                .code(request.getCode())
                .shippingPrice(request.getShippingFee())
                .partner(request.getPartner())
                .status(ShipmentStatus.SHIPPING)
                .inventories(inventories)
                .pickupAddress(pickupAddress)
                .expectedDeliveryDate(request.getExpectedDeliveryDate())
                .order(order)
                .createdAt(LocalDateTime.now())
                .build();

        shipmentRepository.save(shipment);
    }

    @Override
    @PreAuthorize("hasAuthority('SALES.ORDERS')")
    @Transactional
    public void deliverOrder(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        if(order.getOrderStatus() != OrderStatus.SHIPPING){
            throw new AppException(ErrorCode.INVALID_STATUS_TRANSITION);
        }

        order.getShipment().setDeliveryDate(LocalDate.now());
        order.getShipment().setStatus(ShipmentStatus.DELIVERED);
        order.setOrderStatus(OrderStatus.DELIVERED);
        order.getPayment().setStatus(PaymentStatus.COMPLETED);
    }

    private List<OrderVariant> makeOrderVariants(Map<Long, Map<String, Long>> variants, Order order) {
        List<OrderVariant> orderVariants = new ArrayList<>();

        Set<Long> variantIds = variants.keySet();
//        List<CartItem> cartItems = cartItemRepository
//                .findCartItems(
//                        SecurityUtils.extractNameFromAuthentication(), ProductStatus.ACTIVE, cartItemIds
//                );
        List<ProductVariant> pvs = productVariantRepository.findVariantsIn(ProductStatus.ACTIVE, variantIds);

        List<Object[]> warrantyRows = warrantyRepository.findByProductVariantIds(variantIds);
        Map<Long, List<Warranty>> warrantiesMap = warrantyRows.stream()
                .collect(Collectors.groupingBy(
                        r -> (Long)r[0],
                        Collectors.mapping(
                                r -> (Warranty)r[1],
                                Collectors.toList()
                        )
                ));

        List<Object[]> promotionRows = productPromotionRepository.findActivePromotionsByVariantIds(variantIds);
        Map<Long, List<ProductPromotion>> promotionsMap = promotionRows.stream()
                .collect(Collectors.groupingBy(
                        r -> (Long)r[0],
                        Collectors.mapping(
                                r -> (ProductPromotion)r[1],
                                Collectors.toList()
                        )
                ));
        System.out.println("makeOrderVariants "  + warrantiesMap.keySet());

//        Map<Long, Long> warrantyIdMap = variants.stream()
//                .collect(Collectors.toMap(AdminOrderVariantRequest::getVariantId, AdminOrderVariantRequest::getWarrantyId));

        for(ProductVariant pv : pvs){
            Map<String, Long> variant = variants.get(pv.getId());
            Long quantity = variant.get("quantity");
            int updatedRows = productVariantRepository.deductStock(pv.getId(), quantity);

            if (updatedRows == 0) {
                throw new AppException(ErrorCode.PRODUCT_VARIANT_OUT_OF_STOCK);
            }

            List<Warranty> warranties = warrantiesMap.get(pv.getId());
            System.out.println("makeOrderVariants " + pv.getId() + " " + variant.get("warranty"));
            Warranty warranty = warranties.stream()
                    .filter(w -> w.getId().equals(variant.get("warranty")))
                    .findFirst().orElseThrow(() -> new AppException(ErrorCode.WARRANTY_NOT_FOUND_IN_PRODUCT));

            giftProductRepository.deductStock(pv.getId(), quantity);

            OrderVariant orderVariant = OrderVariant.builder()
                    .order(order)
                    .productVariant(pv)
                    .quantity(quantity)
                    .addedAt(LocalDateTime.now())
                    .totalPrice(pv.getCurrentPrice().multiply(BigDecimal.valueOf(quantity)))
                    .warranty(warranty)
                    .build();

            List<ProductPromotion> variantPromotions =
                    promotionsMap.getOrDefault(pv.getId(), List.of());
            List<OrderVariantPromotion> orderVariantPromotions = variantPromotions.stream()
                    .map(ovp -> convertToOrderVariantPromotion(ovp, orderVariant))
                    .toList();
            orderVariant.setPromotions(orderVariantPromotions);
            orderVariants.add(orderVariant);
        }
        return orderVariants;
    }

    @Override
    @PreAuthorize("hasAuthority('SALES.ORDERS')")
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

    private void calculateTotalPriceForOrder(Order order){
        List<OrderVariant> orderVariants = order.getOrderVariants();
        for (OrderVariant ov : orderVariants) {
            productPromotionService.applyPromotions(ov, ov.getPromotions(), order);

            BigDecimal basePrice = Optional.ofNullable(ov.getTotalPrice()).orElse(BigDecimal.ZERO);
            BigDecimal warrantyPrice = Optional.ofNullable(ov.getWarranty())
                    .map(Warranty::getPrice)
                    .orElse(BigDecimal.ZERO)
                    .multiply(BigDecimal.valueOf(ov.getQuantity()));

            ov.setTotalPrice(basePrice.add(warrantyPrice));
        }

        order.setTotalPrice(orderVariants.stream()
                .map(OrderVariant::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
        );
    }

    private OrderVariantPromotion convertToOrderVariantPromotion(ProductPromotion productPromotion, OrderVariant orderVariant) {

        return OrderVariantPromotion.builder()
                .orderVariant(orderVariant)
                .name(productPromotion.getName())
                .description(productPromotion.getDescription())
                .config(productPromotion.getConfig())
                .condition(productPromotion.getCondition())
                .startDate(productPromotion.getStartDate())
                .endDate(productPromotion.getEndDate())
                .type(productPromotion.getType())
                .build();
    }

}
