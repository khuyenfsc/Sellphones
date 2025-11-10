package com.sellphones.service.dashboard;

import com.sellphones.dto.dashboard.DashboardRequest;
import com.sellphones.dto.product.admin.AdminProductVariantListResponse;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.customer.CustomerInfoRepository;
import com.sellphones.repository.order.OrderRepository;
import com.sellphones.repository.order.OrderVariantRepository;
import com.sellphones.repository.payment.PaymentRepository;
import com.sellphones.repository.product.ProductVariantRepository;
import com.sellphones.utils.ImageNameToImageUrlConverter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService{

    private final PaymentRepository paymentRepository;

    private final OrderRepository orderRepository;

    private final CustomerInfoRepository customerInfoRepository;

    private final OrderVariantRepository orderVariantRepository;

    private final ProductVariantRepository productVariantRepository;

    private final ModelMapper modelMapper;

    private final String productVariantImageFolder = "product_variant_images";

    @Override
    @PreAuthorize("hasAuthority('DASHBOARD')")
    public Map<String, Object> getOverallDetails(@Valid DashboardRequest request) {
        YearMonth ym = YearMonth.of(request.getYear(), request.getMonth());
        LocalDateTime start = ym.atDay(1).atStartOfDay();
        LocalDateTime end = ym.atEndOfMonth().atTime(23, 59, 59, 999_999_999);

        BigDecimal totalSales = paymentRepository.calculateTotalSales(start, end);
        long totalOrders = orderRepository.countByOrderedAtBetween(start, end);
        long totalCustomers = customerInfoRepository.countByCreatedAtBetween(start, end);
        long totalUnpaidOrders = orderRepository.countUnpaidOrders(start, end);

        Map<String, Object> map = new HashMap<>();
        map.put("total_sales", totalSales);
        map.put("total_orders", totalOrders);
        map.put("total_customers", totalCustomers);
        map.put("total_unpaid_orders", totalUnpaidOrders);

        return map;
    }

    @Override
    @PreAuthorize("hasAuthority('DASHBOARD')")
    public Map<String, Object> getTodayDetails() {
        LocalDateTime start = LocalDate.now().atStartOfDay();
        LocalDateTime end = LocalDate.now().atTime(23, 59, 59, 999_999_999);

        BigDecimal totalSales = paymentRepository.calculateTotalSales(start, end);
        long totalOrders = orderRepository.countByOrderedAtBetween(start, end);
        long totalCustomers = customerInfoRepository.countByCreatedAtBetween(start, end);

        Map<String, Object> map = new HashMap<>();
        map.put("total_sales", totalSales);
        map.put("total_orders", totalOrders);
        map.put("total_customers", totalCustomers);
        return map;
    }

    @Override
    @PreAuthorize("hasAuthority('DASHBOARD')")
    public AdminProductVariantListResponse getMostSellingVariant(DashboardRequest request) {
        YearMonth ym = YearMonth.of(request.getYear(), request.getMonth());
        LocalDateTime start = ym.atDay(1).atStartOfDay();
        LocalDateTime end = ym.atEndOfMonth().atTime(23, 59, 59, 999_999_999);

        Pageable pageable = PageRequest.of(0, 1);
        List<ProductVariant> variants = orderVariantRepository.getMostSellingVariant(start, end, pageable);

        if(variants.isEmpty()){
            throw new AppException(ErrorCode.MOST_SELLING_VARIANT_NOT_FOUND);
        }

        ProductVariant variant = variants.getFirst();
        variant.setVariantImage(ImageNameToImageUrlConverter.convert(variant.getVariantImage(), productVariantImageFolder));

        return modelMapper.map(variants.getFirst(), AdminProductVariantListResponse.class);
    }

    @Override
    @PreAuthorize("hasAuthority('DASHBOARD')")
    public List<AdminProductVariantListResponse> getMostStockedVariants() {
        List<ProductVariant> variants = productVariantRepository.findTop5ByOrderByStockDesc();
        return variants.stream()
                .map(v -> {
                    v.setVariantImage(ImageNameToImageUrlConverter.convert(v.getVariantImage(), productVariantImageFolder));
                    return modelMapper.map(v, AdminProductVariantListResponse.class);
                }).toList();
    }

    @Override
    @PreAuthorize("hasAuthority('DASHBOARD')")
    public Map<String, Object> getMostSalesCustomer(DashboardRequest request) {
        YearMonth ym = YearMonth.of(request.getYear(), request.getMonth());
        LocalDateTime start = ym.atDay(1).atStartOfDay();
        LocalDateTime end = ym.atEndOfMonth().atTime(23, 59, 59, 999_999_999);

        List<Object[]> topCustomer = orderRepository.findTopCustomerByTotalSales(
                start, end, PageRequest.of(0, 1)
        );

        Object[] row = topCustomer.get(0);
        User user = (User) row[0];
        BigDecimal totalSales = (BigDecimal) row[1];

        Map<String, Object> map = new HashMap<>();
        map.put("user_id", user.getId());
        map.put("full_name", user.getFullName());
        map.put("total_sales", totalSales);

        return map;
    }

    @Override
    @PreAuthorize("hasAuthority('DASHBOARD')")
    public Map<String, Object> getTotalOrdersByDayInMonth(DashboardRequest request) {
        YearMonth ym = YearMonth.of(request.getYear(), request.getMonth());
        LocalDateTime start = ym.atDay(1).atStartOfDay();
        LocalDateTime end = ym.atEndOfMonth().atTime(23, 59, 59, 999_999_999);

        List<Object[]> result = orderRepository.countOrdersByDayInMonth(start, end);

        Map<String, Object> map = new HashMap<>();
        for(Object[] objs : result){
            map.put(objs[0].toString(), (long)objs[1]);
        }

        return map;
    }

    @Override
    public Map<String, Object> getTotalOrdersByMonthInYear(Integer year) {
        List<Object[]> result = orderRepository.countOrdersByMonthInYear(year);
        Map<String, Object> map = new LinkedHashMap<>();
        for(Object[] objs : result){
            map.put(objs[0].toString(), (long)objs[1]);
        }

        return map;
    }


}
