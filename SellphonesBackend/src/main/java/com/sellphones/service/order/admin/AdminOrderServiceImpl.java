package com.sellphones.service.order.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.dashboard.DashboardRequest;
import com.sellphones.dto.order.OrderResponse;
import com.sellphones.dto.order.admin.*;
import com.sellphones.dto.product.OrderProductRequest;
import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.address.AddressType;
import com.sellphones.entity.cart.CartItem;
import com.sellphones.entity.customer.CustomerInfo;
import com.sellphones.entity.inventory.Inventory;
import com.sellphones.entity.order.*;
import com.sellphones.entity.payment.PaymentStatus;
import com.sellphones.entity.product.ProductStatus;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.product.Warranty;
import com.sellphones.entity.promotion.GiftProduct;
import com.sellphones.entity.promotion.OrderVariantPromotion;
import com.sellphones.entity.promotion.ProductPromotion;
import com.sellphones.entity.user.RoleName;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.address.AddressRepository;
import com.sellphones.repository.customer.CustomerInfoRepository;
import com.sellphones.repository.inventory.InventoryRepository;
import com.sellphones.repository.order.OrderRepository;
import com.sellphones.repository.order.ShipmentRepository;
import com.sellphones.repository.product.ProductVariantRepository;
import com.sellphones.repository.product.WarrantyRepository;
import com.sellphones.repository.promotion.ProductPromotionRepository;
import com.sellphones.service.payment.PaymentService;
import com.sellphones.specification.admin.AdminOrderSpecificationBuilder;
import com.sellphones.utils.SecurityUtils;
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
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminOrderServiceImpl implements AdminOrderService{

    private final OrderRepository orderRepository;

    private final ShipmentRepository shipmentRepository;

    private final InventoryRepository inventoryRepository;

    private final AddressRepository addressRepository;

    private final CustomerInfoRepository customerInfoRepository;

    private final WarrantyRepository warrantyRepository;

    private final ProductVariantRepository productVariantRepository;

    private final ProductPromotionRepository productPromotionRepository;

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

        Payment payment = paymentService.initPayment(request.getPaymentMethodId());
        payment.setOrder(order);

        List<OrderVariant> orderVariants = makeOrderVariants(variants, order);
        order.setOrderVariants(orderVariants);
        order.setPayment(payment);
        calculateTotalPriceForOrder(order);

        Order savedOrder = orderRepository.save(order);

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
        int updatedStatus = orderRepository.tryTransitionToShipping(id);
        if (updatedStatus == 0) {
            throw new AppException(ErrorCode.INVALID_STATUS_TRANSITION);
        }
        Order order = orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        if (request.getInventoryItems() == null || request.getInventoryItems().isEmpty()) {
            throw new AppException(ErrorCode.INVALID_SHIPMENT_ITEMS);
        }


        Map<Long, Long> inventoryQuantityMap = request.getInventoryItems().stream()
                .collect(Collectors.toMap(AdminShipmentInventoryItem::getInventoryId, AdminShipmentInventoryItem::getQuantity));
        List<Inventory> inventories = inventoryRepository.findByIdIn(inventoryQuantityMap.keySet());
        for(Inventory inventory : inventories){
            Long quantity = inventoryQuantityMap.get(inventory.getId());

            int updatedQuantity = inventoryRepository.safeIncreaseQuantity(inventory.getId(), -quantity);
            if (updatedQuantity == 0) {
                throw new AppException(ErrorCode.PRODUCT_VARIANT_OUT_OF_STOCK);
            }
        }

        Address address = addressRepository.findByIdAndAddressType(request.getPickupAddressId(), AddressType.PICKUP)
                .orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_FOUND));
        Shipment shipment = Shipment.builder()
                .code(request.getCode())
                .shippingPrice(new BigDecimal(request.getShippingPrice()))
                .deliveryPartner(request.getPartner())
                .inventories(inventories)
                .pickupAddress(address)
                .expectedDeliveryDate(request.getExpectedDeliveryDate())
                .order(order)
                .createdAt(LocalDateTime.now())
                .build();

        shipmentRepository.save(shipment);
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

//        Map<Long, Long> warrantyIdMap = variants.stream()
//                .collect(Collectors.toMap(AdminOrderVariantRequest::getVariantId, AdminOrderVariantRequest::getWarrantyId));

        for(ProductVariant pv : pvs){
            Map<String, Long> variant = variants.get(pv.getId());
            int updatedRows = productVariantRepository.deductStock(pv.getId(), variant.get("quantity"));

            if (updatedRows == 0) {
                throw new AppException(ErrorCode.PRODUCT_VARIANT_OUT_OF_STOCK);
            }

            List<Warranty> warranties = warrantiesMap.get(pv.getId());
            Warranty warranty = warranties.stream()
                    .filter(w -> w.getId().equals(variants.get(pv.getId()))
                    .findFirst().orElseThrow(() -> new AppException(ErrorCode.WARRANTY_NOT_FOUND_IN_PRODUCT));

            for(GiftProduct gf : productVariant.getGiftProducts()){
                long newStock = gf.getStock() - cartItem.getQuantity();
                gf.setStock(Math.max(newStock, 0));
            }

            OrderVariant orderVariant = OrderVariant.builder()
                    .order(order)
                    .productVariant(productVariant)
                    .quantity(cartItem.getQuantity())
                    .addedAt(LocalDateTime.now())
                    .totalPrice(productVariant.getCurrentPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())))
                    .warranty(warranty)
                    .build();

            List<ProductPromotion> variantPromotions =
                    promotionsMap.getOrDefault(productVariant.getId(), List.of());
            List<OrderVariantPromotion> orderVariantPromotions = variantPromotions.stream()
                    .map(ovp -> convertToOrderVariantPromotion(ovp, orderVariant))
                    .toList();
            orderVariant.setPromotions(orderVariantPromotions);
            orderVariants.add(orderVariant);
        }
        return orderVariants;
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

}
