package com.sellphones.service.payment;

import com.sellphones.dto.payment.PaymentRequest;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

public interface VnPayService extends PaymentService{
    Map<String, String> pay(PaymentRequest request, HttpServletRequest servletRequest);
}
