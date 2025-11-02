package com.sellphones.service.order;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.*;
import com.sellphones.dto.product.OrderProductRequest;
import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.cart.CartItem;
import com.sellphones.entity.customer.CustomerInfo;
import com.sellphones.entity.order.Order;
import com.sellphones.entity.order.OrderStatus;
import com.sellphones.entity.order.OrderVariant;
import com.sellphones.entity.payment.*;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.product.Warranty;
import com.sellphones.entity.promotion.*;
import com.sellphones.entity.user.RoleName;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.cart.CartItemRepository;
import com.sellphones.repository.customer.CustomerInfoRepository;
import com.sellphones.repository.order.OrderRepository;
import com.sellphones.repository.payment.PaymentMethodRepository;
import com.sellphones.repository.promotion.ProductPromotionRepository;
import com.sellphones.repository.user.UserRepository;
import com.sellphones.service.payment.PaymentService;
import com.sellphones.service.promotion.ProductPromotionService;
import com.sellphones.specification.OrderSpecificationBuilder;
import com.sellphones.utils.ImageNameToImageUrlConverter;
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

    private final CustomerInfoRepository customerInfoRepository;

    private final ProductPromotionService productPromotionService;

    private final PaymentService paymentService;

    private final ModelMapper modelMapper;

    private final String productVariantFolderName = "product_variant_images";

    private final String giftProductThumbnailFolderName = "gift_products";

    @Override
    public Map<String, Object> getTotalOrders() {
        Long total = orderRepository.countByUser_Email(SecurityUtils.extractNameFromAuthentication());
        Map<String, Object> resultData = new HashMap<>();
        resultData.put("total", total);

        return resultData;
    }

    @Override
    @Transactional
    public void order(OrderRequest request) {
        List<OrderProductRequest> orderProducts = request.getOrderProducts();

        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        PaymentMethod paymentMethod = paymentMethodRepository.findById(request.getPaymentMethodId()).orElseThrow(() -> new AppException(ErrorCode.PAYMENT_METHOD_NOT_FOUND));

        CustomerInfo customerInfo;
        if(user.getRole().getRoleName() != RoleName.ADMIN){
            customerInfo = customerInfoRepository.findByUser_EmailAndId(user.getEmail(), request.getCustomerInfoId()).orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
        }else{
            customerInfo = customerInfoRepository.findById(request.getCustomerInfoId()).orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
        }

        List<OrderVariant> orderVariants = makeOrderVariants(orderProducts);

        Order order = Order.builder()
                .user(user)
                .orderVariants(orderVariants)
                .orderStatus(OrderStatus.PENDING)
                .paymentMethod(paymentMethod)
                .paymentStatus(PaymentStatus.PENDING)
                .orderedAt(LocalDateTime.now())
                .customerInfo(customerInfo)
                .build();
        calculateTotalPriceForOrder(order);

        paymentService.pay(order);

        orderRepository.save(order);

        List<Long> cartItemIds = orderProducts.stream().map(OrderProductRequest::getCartItemId).toList();
        cartItemRepository.deleteByCart_User_EmailAndIdIn(SecurityUtils.extractNameFromAuthentication(), cartItemIds);
    }

    @Override
    public PageResponse<OrderResponse> getOrders(OrderFilterRequest request) {
        Specification<Order> spec = OrderSpecificationBuilder.build(request);
        Sort sort = Sort.by(Sort.Direction.DESC, "orderedAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Page<Order> orderPage = orderRepository.findAll(spec, pageable);
        List<Order> orders = orderPage.getContent();
        List<OrderResponse> response = orders.stream()
                .map(o -> convertOrderToResponse(o, OrderResponse.class))
                .toList();

        return PageResponse.<OrderResponse>builder()
                .result(response)
                .total(orderPage.getTotalElements())
                .totalPages(orderPage.getTotalPages())
                .build();
    }

    @Override
    public OrderDetailResponse getOrderDetailsById(Long id) {
        Order order = orderRepository.findByUser_EmailAndId(SecurityUtils.extractNameFromAuthentication(), id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        return convertOrderToResponse(order, OrderDetailResponse.class);
    }

    @Override
    @Transactional
    public void cancelOrder(Long id) {
        Order order = orderRepository.findByUser_EmailAndId(SecurityUtils.extractNameFromAuthentication(), id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        if (order.getOrderStatus() == OrderStatus.PENDING) {
            order.setOrderStatus(OrderStatus.CANCELED);
        } else if (order.getOrderStatus() == OrderStatus.CONFIRMED) {
            order.setOrderStatus(OrderStatus.WAIT_FOR_CANCELLING);
        } else {
            throw new AppException(ErrorCode.CANCEL_ORDER_FAILED);
        }
    }

    private <T> T convertOrderToResponse(Order o, Class<T> clazz){
        List<OrderVariant> orderVariants = o.getOrderVariants();
        for(OrderVariant ov : orderVariants){
            ProductVariant variant = ov.getProductVariant();

            for(GiftProduct gp:variant.getGiftProducts()){
                gp.setThumbnail(ImageNameToImageUrlConverter.convert(gp.getThumbnail(), giftProductThumbnailFolderName));
            }

            variant.setVariantImage(
                    ImageNameToImageUrlConverter.convert(variant.getVariantImage(),
                            productVariantFolderName)
            );
        }

        return modelMapper.map(o, clazz);
    }

    private List<OrderVariant> makeOrderVariants(List<OrderProductRequest> orderProducts) {
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
            if(productVariant.getStock() < cartItem.getQuantity()){
                throw new AppException(ErrorCode.PRODUCT_VARIANT_OUT_OF_STOCK);
            }
            Warranty warranty = productVariant.getWarranties().stream().filter(w -> w.getId().equals(warrantyIdMap.get(cartItem.getId()))).findFirst().orElseThrow(() -> new AppException(ErrorCode.WARRANTY_NOT_FOUND_IN_PRODUCT));
            productVariant.setStock(productVariant.getStock() - cartItem.getQuantity());

            OrderVariant orderVariant = OrderVariant.builder()
                    .productVariant(productVariant)
                    .quantity(cartItem.getQuantity())
                    .addedAt(LocalDateTime.now())
                    .totalPrice(calculateTotalPriceForOrderVariant(cartItem, warranty))
                    .warranty(warranty)
                    .build();

            List<OrderVariantPromotion> orderVariantPromotions = cartItemPromotions.stream()
                    .map(ovp -> convertToOrderVariantPromotion(ovp, orderVariant))
                    .toList();
            orderVariant.setPromotions(orderVariantPromotions);
            orderVariants.add(orderVariant);
        }
        return orderVariants;
    }

    private BigDecimal calculateTotalPriceForOrderVariant(CartItem cartItem, Warranty warranty){
        return cartItem.getProductVariant().getCurrentPrice()
                .multiply(new BigDecimal(cartItem.getQuantity()))
                .add(warranty.getPrice().multiply(new BigDecimal(cartItem.getQuantity()))
        );
    }

    private void calculateTotalPriceForOrder(Order order){
        List<OrderVariant> orderVariants = order.getOrderVariants();
        orderVariants.forEach(ov -> productPromotionService.applyPromotions(ov, ov.getPromotions(), order));
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
