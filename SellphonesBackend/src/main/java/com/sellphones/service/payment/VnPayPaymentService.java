package com.sellphones.service.payment;

import com.sellphones.configuration.VnPayConfiguration;
import com.sellphones.dto.payment.PaymentRequest;
import com.sellphones.entity.order.Order;
import com.sellphones.entity.order.Payment;
import com.sellphones.entity.payment.PaymentStatus;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.order.OrderRepository;
import com.sellphones.repository.payment.PaymentMethodRepository;
import com.sellphones.repository.payment.PaymentRepository;
import com.sellphones.utils.SecurityUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VnPayPaymentService implements VnPayService{

    private final PaymentMethodRepository paymentMethodRepository;

    private final OrderRepository orderRepository;

    private final PaymentRepository paymentRepository;

    private final VnPayConfiguration vnPayConfiguration;

    @Override
    public PaymentMethodRepository getPaymentMethodRepository() {
        return this.paymentMethodRepository;
    }

    @Override
    @Transactional
    public Map<String, String> pay(PaymentRequest request, HttpServletRequest servletRequest) {
        Order order = orderRepository.findByUser_EmailAndId(
                SecurityUtils.extractNameFromAuthentication(),
                request.getOrderId()
        ).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        Payment payment = order.getPayment();

        if(payment.getStatus() == PaymentStatus.COMPLETED){
            throw new AppException(ErrorCode.PAYMENT_ALREADY_COMPLETED);
        }

        String txnRef = getRandomRef();
        payment.setTxnRef(txnRef);
        payment.setAmount(order.getTotalPrice());

        String timePattern = "yyyyMMddHHmmss";
        Map<String, Object> params = vnPayConfiguration.getParams();
        params.put("vnp_Amount", order.getTotalPrice()
                .setScale(0, RoundingMode.DOWN)
                .multiply(BigDecimal.valueOf(100))
                .toBigInteger()
                .toString());
        params.put("vnp_CreateDate", LocalDateTime.now().format(DateTimeFormatter.ofPattern(timePattern)));
        params.put("vnp_ExpireDate", LocalDateTime.now().plusMinutes(10).format(DateTimeFormatter.ofPattern(timePattern)));
        params.put("vnp_IpAddr", getClientIp(servletRequest));
        params.put("vnp_TxnRef", txnRef);

        String query = buildQuery(params);
        String hashedQuery = hashByHMACSha512(query);

        Map<String, String> result = new HashMap<>();
        result.put("url", vnPayConfiguration.getUrl() + "?" + query + "&vnp_SecureHash=" + hashedQuery);
        return result;
    }

    @Override
    public String handleVnPayCallback(HttpServletRequest request) {
        System.out.println(request.getQueryString());

        Map<String, Object> params = extractParams(request);
        String query = buildQuery(params);
        String hashedStr = hashByHMACSha512(query);
        if(!hashedStr.equalsIgnoreCase(request.getParameter("vnp_SecureHash"))){
            throw new AppException(ErrorCode.INVALID_VNPAY_SIGNATURE);
        }

        Payment payment = paymentRepository.findByTxnRef(request.getParameter("vnp_TxnRef")).orElseThrow(() -> new AppException(ErrorCode.PAYMENT_NOT_FOUND));
        if(payment.getStatus() == PaymentStatus.COMPLETED){
            throw new AppException(ErrorCode.PAYMENT_ALREADY_COMPLETED);
        }

        String redirectUrl;

        if ("00".equals(request.getParameter("vnp_ResponseCode"))) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

            payment.setStatus(PaymentStatus.COMPLETED);
            payment.setCode("VNP" + "_" + request.getParameter("vnp_TransactionNo"));
            payment.setPaymentDate(
                    LocalDateTime.parse(request.getParameter("vnp_PayDate"), formatter)
            );
            paymentRepository.save(payment);
            redirectUrl = vnPayConfiguration.getSuccessRedirectUrl();
        } else {
            redirectUrl = vnPayConfiguration.getFailRedirectUrl();
        }

        return redirectUrl;
    }

    private Map<String, Object> extractParams(HttpServletRequest request) {
        Map<String, Object> params = new HashMap<>();
        request.getParameterMap().forEach((key, values) -> {
            if (values.length > 0) params.put(key, values[0]);
        });
        return params;
    }

    private String buildDataToHash(Map<String, String> params) {
        // Loại bỏ vnp_SecureHash và vnp_SecureHashType
        Map<String, String> filtered = params.entrySet().stream()
                .filter(e -> !"vnp_SecureHash".equals(e.getKey()) && !"vnp_SecureHashType".equals(e.getKey()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        // Sắp xếp theo tên trường alphabet
        return filtered.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(e -> e.getKey() + "=" + URLEncoder.encode(e.getValue(), StandardCharsets.US_ASCII))
                .collect(Collectors.joining("&"));
    }


    private String getRandomRef(){
        String result = "";
        Random random = new Random();
        for(int i = 0; i < 6; i++){
            result += String.valueOf(random.nextInt(10));
        }

        return result;
    }

    private String getClientIp(HttpServletRequest servletRequest){
        String ip = servletRequest.getHeader("X-Forwarded-For");
        if (ip == null || ip.isBlank()) {
            ip = servletRequest.getRemoteAddr();
        }

        return ip;
    }

    private String hashByHMACSha512(String query){
        SecretKeySpec secretKeySpec = new SecretKeySpec(
                vnPayConfiguration.getHashSecret().getBytes(StandardCharsets.UTF_8),
                "HmacSHA512"
        );
        try {
            Mac mac = Mac.getInstance("HmacSHA512");
            mac.init(secretKeySpec);

            byte[] bytes = mac.doFinal(query.getBytes(StandardCharsets.UTF_8));
            StringBuilder hash = new StringBuilder();
            for(byte b : bytes){
                hash.append(String.format("%02x", b));
            }

            return hash.toString();
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException(e);
        }
    }

    private String buildQuery(Map<String, Object> params){
        List<String> paramKeys = params.keySet().stream()
                .sorted(new Comparator<String>() {
                    @Override
                    public int compare(String o1, String o2) {
                        return o1.compareTo(o2);
                    }
                }).toList();

        StringBuilder query = new StringBuilder();
        for(String k : paramKeys){
            if(!"vnp_SecureHash".equals(k)){
                query.append(k);
                query.append("=");
                query.append(URLEncoder.encode(params.get(k).toString(), StandardCharsets.US_ASCII));
                query.append("&");
            }
        }

        String queryStr = query.toString();

        return queryStr.substring(0, queryStr.length() - 1);
    }

}
