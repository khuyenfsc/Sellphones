package com.sellphones.service.order;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.*;
import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.cart.CartItem;
import com.sellphones.entity.customer.CustomerInfo;
import com.sellphones.entity.order.Order;
import com.sellphones.entity.order.OrderStatus;
import com.sellphones.entity.order.OrderVariant;
import com.sellphones.entity.payment.*;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.product.Warranty;
import com.sellphones.entity.promotion.*;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.address.AddressRepository;
import com.sellphones.repository.cart.CartItemRepository;
import com.sellphones.repository.order.OrderRepository;
import com.sellphones.repository.payment.PaymentMethodRepository;
import com.sellphones.repository.promotion.ProductPromotionRepository;
import com.sellphones.repository.user.UserRepository;
import com.sellphones.service.payment.PaymentService;
import com.sellphones.service.promotion.ProductPromotionService;
import com.sellphones.specification.OrderSpecificationBuilder;
import com.sellphones.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService{

    private final OrderRepository orderRepository;

    private final CartItemRepository cartItemRepository;

    private final UserRepository userRepository;

    private final PaymentMethodRepository paymentMethodRepository;

    private final ProductPromotionRepository productPromotionRepository;

    private final AddressRepository addressRepository;

    private final ProductPromotionService productPromotionService;

    private final PaymentService paymentService;

    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public void order(OrderRequest orderRequest) {
        List<OrderProductRequest> orderProducts = orderRequest.getOrderProducts();
        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        PaymentMethod paymentMethod = paymentMethodRepository.findById(orderRequest.getPaymentMethodId()).orElseThrow(() -> new AppException(ErrorCode.PAYMENT_METHOD_NOT_FOUND));
        Order order = Order.builder()
                .user(user)
                .orderStatus(OrderStatus.PENDING)
                .paymentMethod(paymentMethod)
                .paymentStatus(PaymentStatus.PENDING)
                .orderedAt(LocalDateTime.now())
                .customerInfo(convertToCustomerInfo(orderRequest.getCustomerInfo()))
                .build();
        List<OrderVariant> orderVariants = makeOrderVariants(orderProducts, order);
        order.setOrderVariants(orderVariants);
        calculateTotalPriceForOrder(order);
        paymentService.pay(orderRequest.getPaymentMethodType());

        orderRepository.save(order);

        List<Long> cartItemIds = orderProducts.stream().map(OrderProductRequest::getCartItemId).toList();
        cartItemRepository.deleteByCart_User_EmailAndIdIn(SecurityUtils.extractNameFromAuthentication(), cartItemIds);
    }

    @Override
    public PageResponse<OrderListResponse> getOrders(LocalDate startDate, LocalDate endDate, Integer page, Integer size, OrderStatus orderStatus) {
        Specification<Order> spec = OrderSpecificationBuilder.build(startDate, endDate, orderStatus);
        Sort sort = Sort.by(Sort.Direction.DESC, "orderedAt");
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Order> orderPage = orderRepository.findAll(spec, pageable);
        List<Order> orders = orderPage.getContent();
        List<OrderListResponse> responses = orders.stream()
                .map(o -> modelMapper.map(o, OrderListResponse.class))
                .toList();

        return PageResponse.<OrderListResponse>builder()
                .result(responses)
                .total(orderPage.getTotalElements())
                .build();
    }

    @Override
    public OrderDetailResponse getOrderDetailsById(Long id) {
        Order order = orderRepository.findByUser_EmailAndId(SecurityUtils.extractNameFromAuthentication(), id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        return modelMapper.map(order, OrderDetailResponse.class);
    }

    @Override
    @Transactional
    public void cancelOrder(Long id) {
        Order order = orderRepository.findByUser_EmailAndId(SecurityUtils.extractNameFromAuthentication(), id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        if (order.getOrderStatus() == OrderStatus.PENDING) {
            order.setOrderStatus(OrderStatus.CANCELED);
        } else if (order.getOrderStatus() == OrderStatus.ACCEPTED) {
            order.setOrderStatus(OrderStatus.WAIT_FOR_CANCELLING);
        } else {
            throw new AppException(ErrorCode.CANCEL_ORDER_FAILED);
        }

        if(order.getPaymentStatus() == PaymentStatus.COMPLETED){
            paymentService.refund(order);
            order.setPaymentStatus(PaymentStatus.REFUNDED);
        }
    }

    private List<OrderVariant> makeOrderVariants(List<OrderProductRequest> orderProducts, Order order) {
        List<OrderVariant> orderVariants = new ArrayList<>();
        Set<Long> allPromotionIds = orderProducts.stream()
                .flatMap(op -> op.getPromotionIds().stream())
                .collect(Collectors.toSet());
        List<ProductPromotion> promotions = productPromotionRepository.findByIdIn(allPromotionIds);
        Map<Long, ProductPromotion> promotionMap = promotions.stream().collect(Collectors.toMap(BaseEntity::getId, p -> p));

        List<Long> cartItemIds = orderProducts.stream().map(OrderProductRequest::getCartItemId).toList();
        List<CartItem> cartItems = cartItemRepository.findByCart_User_EmailAndIdIn(SecurityUtils.extractNameFromAuthentication(), cartItemIds);
        Map<Long, List<Long>> promotionIdMap = orderProducts.stream().collect(Collectors.toMap(OrderProductRequest::getCartItemId, OrderProductRequest::getPromotionIds));
        Map<Long, Long> warrantyIdMap =  orderProducts.stream().collect(Collectors.toMap(OrderProductRequest::getCartItemId, OrderProductRequest::getWarrantyId));

        for(CartItem cartItem : cartItems){
            List<Long> promotionIds = promotionIdMap.get(cartItem.getId());
            List<ProductPromotion> cartItemPromotions = promotionIds.stream().map(promotionMap::get).filter(Objects::nonNull).toList();
            ProductVariant productVariant = cartItem.getProductVariant();
            if(productVariant.getStock() == 0){
                throw new AppException(ErrorCode.PRODUCT_VARIANT_OUT_OF_STOCK);
            }
            Warranty warranty = productVariant.getWarranties().stream().filter(w -> w.getId().equals(warrantyIdMap.get(cartItem.getId()))).findFirst().orElseThrow(() -> new AppException(ErrorCode.WARRANTY_NOT_FOUND_IN_PRODUCT));

            OrderVariant orderVariant = OrderVariant.builder()
                    .productVariant(productVariant)
                    .quantity(cartItem.getQuantity())
                    .order(order)
                    .addedAt(LocalDateTime.now())
                    .totalPrice(calculateTotalPriceForOrderVariant(cartItem, warranty))
                    .warranty(warranty)
                    .build();
            List<OrderVariantPromotion> orderVariantPromotions = cartItemPromotions.stream()
                    .map(ovp -> convertToOrderVariantPromotionFrom(ovp, orderVariant))
                    .toList();
            orderVariant.setPromotions(orderVariantPromotions);
            productPromotionService.applyPromotions(orderVariant, cartItemPromotions, order);
            orderVariants.add(orderVariant);
        }
        return orderVariants;
    }

    private BigDecimal calculateTotalPriceForOrderVariant(CartItem cartItem, Warranty warranty){
        return cartItem.getProductVariant().getPrice()
                .multiply(new BigDecimal(cartItem.getQuantity()))
                .add(warranty.getVal().multiply(new BigDecimal(cartItem.getQuantity()))
        );
    }

    private void calculateTotalPriceForOrder(Order order){
        List<OrderVariant> orderVariants = order.getOrderVariants();
        order.setTotalPrice(orderVariants.stream()
                .map(OrderVariant::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
        );
    }

    private OrderVariantPromotion convertToOrderVariantPromotionFrom(ProductPromotion productPromotion, OrderVariant orderVariant) {

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

    private CustomerInfo convertToCustomerInfo(OrderCustomerInfoRequest customerInfoRequest){
        Address address = addressRepository.save(convertToAddress(customerInfoRequest.getAddress()));
        return CustomerInfo.builder()
                .fullName(customerInfoRequest.getFullName())
                .phoneNumber(customerInfoRequest.getPhoneNumber())
                .address(address)
                .build();
    }

    private Address convertToAddress(OrderAddressRequest addressRequest){
        return Address.builder()
                .street(addressRequest.getStreet())
                .ward(addressRequest.getWard())
                .district(addressRequest.getDistrict())
                .province(addressRequest.getProvince())
                .build();
    }


}

//    private void
//
//    private BigDecimal getPriceAfterApplyPromotions(CartItem cartItem){
//
//    }
//
//    private List<Promotion> getPromotionFromPromotionIds(List<String> promotionIds){
//
//    }
//}
