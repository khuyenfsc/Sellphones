package com.sellphones.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.LinkedHashMap;
import java.util.Map;

@Configuration
@Setter
@ConfigurationProperties(prefix = "spring.payment.vnpay")
public class VnPayConfiguration {

    @Getter
    private String hashSecret;

    @Getter
    private String url;

    private String command;
    private String currCode;
    private String locale;
    private String orderInfo;
    private Integer orderType;
    private String returnUrl;
    private String tmnCode;
    private String version;

    @Getter
    private String successRedirectUrl;

    @Getter
    private  String failRedirectUrl;
    public Map<String, Object> getParams() {
        Map<String, Object> params = new LinkedHashMap<>();

        params.put("vnp_Command", command);
        params.put("vnp_CurrCode", currCode);
        params.put("vnp_Locale", locale);
        params.put("vnp_OrderInfo", orderInfo);
        params.put("vnp_OrderType", orderType);
        params.put("vnp_ReturnUrl", returnUrl);
        params.put("vnp_TmnCode", tmnCode);
        params.put("vnp_Version", version);

        return params;
    }


}
