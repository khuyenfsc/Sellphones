package com.sellphones.service.payment;

import com.nimbusds.jose.crypto.impl.HMAC;
import com.sellphones.configuration.VnPayConfiguration;
import com.sellphones.dto.payment.PaymentRequest;
import com.sellphones.entity.order.Order;
import com.sellphones.entity.order.Payment;
import com.sellphones.entity.payment.PaymentMethod;
import com.sellphones.entity.payment.PaymentStatus;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.order.OrderRepository;
import com.sellphones.repository.payment.PaymentMethodRepository;
import com.sellphones.utils.SecurityUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.digest.HmacAlgorithms;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class VnPayPaymentService implements VnPayService{

    private final PaymentMethodRepository paymentMethodRepository;

    private final OrderRepository orderRepository;

    private final VnPayConfiguration vnPayConfiguration;

    @Override
    public PaymentMethodRepository getPaymentMethodRepository() {
        return this.paymentMethodRepository;
    }

    @Override
    public Map<String, String> pay(PaymentRequest request, HttpServletRequest servletRequest) {
        Order order = orderRepository.findByUser_EmailAndId(
                SecurityUtils.extractNameFromAuthentication(),
                request.getOrderId()
        ).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        String timePattern = "yyyyMMddHHmmss";
        Map<String, Object> params = vnPayConfiguration.getParams();
        params.put("vnp_Amount", order.getTotalPrice());
        params.put("vnp_CreateDate", LocalDateTime.now().format(DateTimeFormatter.ofPattern(timePattern)));
        params.put("vnp_ExpireDate", LocalDateTime.now().plusMinutes(10).format(DateTimeFormatter.ofPattern(timePattern)));
        params.put("vnp_IpAddr", getClientIp(servletRequest));
        params.put("vnp_TxnRef", getRandomRef());

        String query = buildQuery(params);
        String hashedQuery = hashByHMACSha512(query);

        Map<String, String> result = new HashMap<>();
        result.put("url", vnPayConfiguration.getUrl() + "?" + query + "&vnp_SecureHash=" + hashedQuery);
        return result;
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
            query.append(k);
            query.append("=");
            query.append(URLEncoder.encode(params.get(k).toString(), StandardCharsets.US_ASCII));
            query.append("&");
        }

        String queryStr = query.toString();

        return queryStr.substring(0, queryStr.length() - 1);
    }

}
