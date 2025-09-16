package com.sellphones.service.order;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.dto.order.OrderProductRequest;
import com.sellphones.dto.order.OrderRequest;
import com.sellphones.entity.cart.CartItem;
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
import com.sellphones.repository.cart.CartItemRepository;
import com.sellphones.repository.order.OrderRepository;
import com.sellphones.repository.payment.PaymentMethodRepository;
import com.sellphones.repository.promotion.ProductPromotionRepository;
import com.sellphones.repository.user.UserRepository;
import com.sellphones.service.product.WarrantyService;
import com.sellphones.utils.PromotionConditionChecker;
import com.sellphones.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService{

    private final OrderRepository orderRepository;

    private final CartItemRepository cartItemRepository;

    private final UserRepository userRepository;

    private final PaymentMethodRepository paymentMethodRepository;

    private final ProductPromotionRepository productPromotionRepository;

    private final WarrantyService warrantyService;

    private final ObjectMapper objectMapper;

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
                .build();

        List<OrderVariant> orderVariants = makeOrderVariants(orderProducts, order);
        order.setOrderVariants(orderVariants);
        PaymentStrategy paymentStrategy = PaymentStrategyFactory.getPaymentStrategy(orderRequest.getPaymentMethodType());
        if(paymentStrategy == null){
            throw new AppException(ErrorCode.PAYMENT_METHOD_TYPE_NOT_FOUND);
        }


    }

    private List<OrderVariant> makeOrderVariants(List<OrderProductRequest> orderProducts, Order order) {
        List<OrderVariant> orderVariants = new ArrayList<>();
        Set<Long> allPromotionIds = orderProducts.stream()
                .flatMap(op -> op.getPromotionIds().stream())
                .collect(Collectors.toSet());
        List<ProductPromotion> promotions = productPromotionRepository.findByIdIn(allPromotionIds);

        List<Long> cartItemIds = orderProducts.stream().map(op -> op.getCartItemId()).toList();
        List<CartItem> cartItems = cartItemRepository.findByCart_User_EmailAndIdIn(SecurityUtils.extractNameFromAuthentication(), cartItemIds);
        Map<Long, List<Long>> promotionIdsMap = orderProducts.stream().collect(Collectors.toMap(op -> op.getCartItemId(), op -> op.getPromotionIds()));
        Map<Long, Long> warrantyIdsMap =  orderProducts.stream().collect(Collectors.toMap(op -> op.getCartItemId(), op -> op.getWarrantyId()));

        for(CartItem cartItem : cartItems){
            List<Long> promotionIds = promotionIdsMap.get(cartItem.getId());
            List<ProductPromotion> cartItemPromotions = promotions.stream().filter(p -> promotionIds.contains(p.getId())).toList();
            ProductVariant productVariant = cartItem.getProductVariant();
            Warranty warranty = productVariant.getWarranties().stream().filter(w -> w.getId().equals(warrantyIdsMap.get(cartItem.getId()))).findFirst().orElseThrow(() -> new AppException(ErrorCode.WARRANTY_NOT_FOUND_IN_PRODUCT));

            OrderVariant orderVariant = OrderVariant.builder()
                    .productVariant(productVariant)
                    .quantity(cartItem.getQuantity())
                    .order(order)
                    .addedAt(LocalDateTime.now())
                    .totalPrice(cartItem.getProductVariant().getPrice().multiply(new BigDecimal(cartItem.getQuantity())))
                    .warranty(warranty)
                    .build();
            List<OrderVariantPromotion> orderVariantPromotions = cartItemPromotions.stream()
                    .map(ovp -> convertToOrderVariantPromotionFrom(ovp, orderVariant))
                    .toList();


            for(ProductPromotion cartItemPromotion : cartItemPromotions){
                try{
                    PromotionConditionDto promotionConditionDto = objectMapper.readValue(cartItemPromotion.getCondition(), PromotionConditionDto.class);
                    if(PromotionConditionChecker.isEligible(order, promotionConditionDto)){
                        PromotionAction promotionAction = PromotionActionFactory.getAction(cartItemPromotion.getType());
                        promotionAction.apply(orderVariant, cartItemPromotion.getConfig());
                    }
                }catch (JsonProcessingException e){
                    throw new RuntimeException(e.getMessage());
                }
            }

            orderVariants.add(orderVariant);
        }

        return orderVariants;
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
